// apps/api/src/sites/sites.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from './site.schema';
import { PublishSitePayload, Site as SiteType } from '@small-web/shared';
import { SANITIZE_OPTIONS, extractTextContent } from '../common/sanitize.config';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class SitesService {
    constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) { }

    /**
     * Publishes a new site. Sanitizes the HTML and extracts text for search.
     * Time: O(n) where n is the length of the HTML string (due to sanitization).
     * Space: O(n) for the sanitized strings.
     */
    async publish(payload: PublishSitePayload): Promise<SiteType> {
        const safeHtml = sanitizeHtml(payload.html, SANITIZE_OPTIONS);
        const textContent = extractTextContent(safeHtml);

        try {
            const newSite = await this.siteModel.create({
                ...payload,
                html: safeHtml,
                textContent,
            });

            // Explicitly map the Mongoose document to our Shared Interface
            // This ensures the Date is converted to a string and satisfies TypeScript.
            return {
                address: newSite.address,
                title: newSite.title,
                html: newSite.html,
                authorId: newSite.authorId,
                createdAt: newSite.createdAt.toISOString(),
            };
        } catch (error: any) {
            if (error.code === 11000) {
                throw new ConflictException(`Address ${payload.address} is already taken.`);
            }
            throw error;
        }
    }
    /**
     * Fetches a site by its exact address.
     * Time: O(1) amortized (B-Tree index lookup on address).
     */
    async findByAddress(address: string): Promise<SiteType> {
        const site = await this.siteModel.findOne({ address }).lean().exec();
        if (!site) {
            throw new NotFoundException(`Nowhere found at address: ${address}`);
        }
        return site as unknown as SiteType;
    }

    /**
     * Full-text search across the web.
     * Time: O(log n) via MongoDB text index.
     */
    async search(query: string): Promise<SiteType[]> {
        if (!query || query.trim().length === 0) {
            return [];
        }

        return this.siteModel
            .find(
                { $text: { $search: query } },
                { score: { $meta: 'textScore' } } // Sort by relevance
            )
            .sort({ score: { $meta: 'textScore' } })
            .limit(20)
            .lean()
            .exec() as unknown as SiteType[];
    }
}