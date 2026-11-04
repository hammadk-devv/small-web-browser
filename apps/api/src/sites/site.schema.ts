// apps/api/src/sites/site.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SiteDocument = HydratedDocument<Site>;

@Schema({ timestamps: true })
export class Site {
    @Prop({ required: true, unique: true, index: true })
    address: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    html: string;

    // Stripped version of the HTML for efficient full-text search
    @Prop({ required: true })
    textContent: string;

    @Prop({ required: true, index: true })
    authorId: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);

// Compound text index to search by Title AND Body Content simultaneously
SiteSchema.index({ title: 'text', textContent: 'text' });