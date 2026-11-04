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

    @Prop({ required: true })
    textContent: string;

    @Prop({ required: true })
    snippet: string;

    @Prop({ required: true, index: true })
    authorId: string;

    // Explicitly declare the timestamp so TypeScript knows about it
    @Prop()
    createdAt: Date;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
SiteSchema.index({ title: 'text', textContent: 'text' });
