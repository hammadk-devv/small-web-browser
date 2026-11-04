// apps/api/src/visits/visit.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VisitDocument = HydratedDocument<Visit>;

@Schema({ timestamps: true })
export class Visit {
    @Prop({ required: true, index: true })
    personId: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    referrer?: string;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);

// Compound index for fast retrieval of a specific person's history sorted by time
VisitSchema.index({ personId: 1, createdAt: -1 });