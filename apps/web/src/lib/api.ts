// apps/web/src/lib/api.ts
import { Site, PublishSitePayload, Visit } from '@small-web/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
    async getSite(address: string): Promise<Site> {
        let res: Response;
        try {
            res = await fetch(`${API_URL}/sites/${address}`);
        } catch {
            throw new Error(`Network error: Failed to reach API at ${API_URL}`);
        }

        if (!res.ok) {
            if (res.status === 404) throw new Error(`Nowhere found at address: ${address}`);
            if (res.status >= 500) throw new Error(`Server error (${res.status}): API is unhealthy`);
            throw new Error(`Request failed with status ${res.status}`);
        }
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
        if (!res.ok) throw new Error('Failed to record visit: ' + res.status);
        return res.json();
    },

    async getHistory(personId: string): Promise<Visit[]> {
        const res = await fetch(`${API_URL}/visits/${personId}`);
        return res.json();
    },
};
