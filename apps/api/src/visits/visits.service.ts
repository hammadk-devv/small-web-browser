// apps/api/src/visits/visits.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './visit.schema';
import { Visit as VisitType } from '@small-web/shared';

@Injectable()
export class VisitsService {
    constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>) { }

    /**
     * Records a navigation event.
     * Time: O(1) insert operation.
     */
    async recordVisit(data: Omit<VisitType, 'visitedAt'>): Promise<VisitType> {
        const visit = await this.visitModel.create(data);
        return {
            ...visit.toObject(),
            visitedAt: visit.get('createdAt').toISOString(),
        } as VisitType;
    }

    /**
     * Retrieves a person's history, newest first.
     * Time: O(k) where k is the number of visits returned (limit 100).
     */
    async getHistory(personId: string): Promise<VisitType[]> {
        const visits = await this.visitModel
            .find({ personId })
            .sort({ createdAt: -1 })
            .limit(100)
            .lean()
            .exec();

        return visits.map((v) => ({
            ...v,
            visitedAt: (v as any).createdAt.toISOString(),
        })) as VisitType[];
    }
}