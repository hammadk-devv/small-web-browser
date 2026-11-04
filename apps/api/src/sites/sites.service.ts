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
     * Computes server-side snippet to avoid sending full HTML for search listings.
     * Time: O(n) where n is the length of the HTML string (due to sanitization).
     * Space: O(n) for the sanitized strings.
     */
    async publish(payload: PublishSitePayload): Promise<SiteType> {
        const safeHtml = sanitizeHtml(payload.html, SANITIZE_OPTIONS);
        const textContent = extractTextContent(safeHtml);
        const snippet = textContent.length > 180 ? textContent.substring(0, 180) + '...' : textContent;

        try {
            const newSite = await this.siteModel.create({
                ...payload,
                html: safeHtml,
                textContent,
                snippet,
            });

            // Explicitly map the Mongoose document to our Shared Interface
            return {
                address: newSite.address,
                title: newSite.title,
                html: newSite.html,
                authorId: newSite.authorId,
                createdAt: newSite.createdAt.toISOString(),
                snippet: newSite.snippet,
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
     * Projects out textContent and snippet to save bandwidth since iframe renders full HTML.
     * Time: O(1) amortized (B-Tree index lookup on address).
     */
    async findByAddress(address: string): Promise<SiteType> {
        const site = await this.siteModel.findOne({ address }, { textContent: 0, snippet: 0 }).lean().exec();
        if (!site) {
            throw new NotFoundException(`Nowhere found at address: ${address}`);
        }
        return site as unknown as SiteType;
    }

    /**
     * Full-text & keyword search across the web.
     * Returns sites with precomputed snippet and projects out textContent.
     * Time: O(log n) text and B-tree index queries, merged in O(k) with Map deduplication.
     */
    async search(query: string): Promise<SiteType[]> {
        const trimmed = query?.trim();
        if (!trimmed) {
            return [];
        }

        const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'i');

        // 1. Full-text search via MongoDB index (handles word stems and text ranking)
        const textSearchPromise = this.siteModel
            .find(
                { $text: { $search: trimmed } },
                { score: { $meta: 'textScore' } }
            )
            .select({ textContent: 0 })
            .sort({ score: { $meta: 'textScore' } })
            .limit(20)
            .lean()
            .exec()
            .catch(() => []);

        // 2. Case-insensitive regex search matching address, title, and body textContent
        const regexSearchPromise = this.siteModel
            .find({
                $or: [
                    { address: regex },
                    { title: regex },
                    { textContent: regex },
                ],
            })
            .select({ textContent: 0 })
            .limit(20)
            .lean()
            .exec()
            .catch(() => []);

        const [textResults, regexResults] = await Promise.all([
            textSearchPromise,
            regexSearchPromise,
        ]);

        // Deduplicate results preserving relevance ordering (O(1) lookups via Map)
        const mergedMap = new Map<string, SiteType>();

        // Priority 1: Exact address match (if user typed partial or full address)
        for (const site of regexResults) {
            if (site.address.toLowerCase() === trimmed.toLowerCase()) {
                mergedMap.set(site.address, site as unknown as SiteType);
            }
        }

        // Priority 2: Text index scored relevance results
        for (const site of textResults) {
            if (!mergedMap.has(site.address)) {
                mergedMap.set(site.address, site as unknown as SiteType);
            }
        }

        // Priority 3: Regex partial matches on address, title, or textContent
        for (const site of regexResults) {
            if (!mergedMap.has(site.address)) {
                mergedMap.set(site.address, site as unknown as SiteType);
            }
        }

        return Array.from(mergedMap.values()).slice(0, 20);
    }
}
