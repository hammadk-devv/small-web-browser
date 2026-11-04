// apps/api/src/seed/seed.ts
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { SEED_SITES, SEED_HISTORY } from './seed.data';
import { extractTextContent, SANITIZE_OPTIONS } from '../common/sanitize.config';
import sanitizeHtml from 'sanitize-html';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/small-web';

async function seed() {
    console.log('🌱 Starting deterministic seed...');
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        const db = client.db();

        // 1. Idempotency: Drop collections to ensure a clean slate.
        console.log('🧹 Clearing existing sites and visits...');
        await db.collection('sites').drop().catch(() => { });
        await db.collection('visits').drop().catch(() => { });

        // 2. Insert Sites
        console.log('📄 Inserting sites...');
        const sitesToInsert = SEED_SITES.map(site => {
            const safeHtml = sanitizeHtml(site.html, SANITIZE_OPTIONS);
            return {
                ...site,
                html: safeHtml,
                textContent: extractTextContent(safeHtml),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
        await db.collection('sites').insertMany(sitesToInsert);

        // Build indexes for search and lookup
        await db.collection('sites').createIndex({ address: 1 }, { unique: true });
        await db.collection('sites').createIndex({ title: 'text', textContent: 'text' });

        // 3. Insert History
        console.log('🕰️  Inserting history...');
        const now = Date.now();
        const visitsToInsert = SEED_HISTORY.map(visit => {
            const visitTime = new Date(now - visit.minutesAgo * 60 * 1000);
            return {
                personId: visit.personId,
                address: visit.address,
                title: visit.title,
                referrer: undefined,
                createdAt: visitTime,
                updatedAt: visitTime,
            };
        });
        await db.collection('visits').insertMany(visitsToInsert);

        // Build compound index for fast history retrieval
        await db.collection('visits').createIndex({ personId: 1, createdAt: -1 });

        console.log(`✨ Seed complete! Inserted ${sitesToInsert.length} sites and ${visitsToInsert.length} visits.`);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

seed();