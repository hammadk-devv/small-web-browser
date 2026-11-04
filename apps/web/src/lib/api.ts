// apps/web/src/lib/api.ts
import { Site, PublishSitePayload, Visit } from '@small-web/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
    async getSite(address: string): Promise<Site> {
        const res = await fetch(`${API_URL}/sites/${address}`);
        if (!res.ok) throw new Error('Not found');
        return res.json();
    },

    async search(query: string): Promise<Site[]> {
        const res = await fetch(`${API_URL}/sites/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Search failed');
        return res.json();
    },

    async publish(payload: PublishSitePayload): Promise<Site> {
        const res = await fetch(`${API_URL}/sites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Publish failed');
        }
        return res.json();
    },

    async recordVisit(payload: Omit<Visit, 'visitedAt'>): Promise<Visit> {
        const res = await fetch(`${API_URL}/visits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return res.json();
    },

    async getHistory(personId: string): Promise<Visit[]> {
        const res = await fetch(`${API_URL}/visits/${personId}`);
        return res.json();
    },
};