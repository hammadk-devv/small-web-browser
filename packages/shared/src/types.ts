// packages/shared/src/types.ts

/** A recorded navigation event. The atomic unit of history. */
export interface Visit {
    personId: string;
    address: string;
    title: string;
    visitedAt: string; // ISO string for easy JSON serialization over HTTP
    referrer?: string;
}

/** A single state within the browser's navigation timeline. */
export interface HistoryEntry {
    address: string;
    title: string;
    visitedAt: string;
}

/** The payload required to publish a new site. */
export interface PublishSitePayload {
    address: string;
    title: string;
    html: string;
    authorId: string;
}

/** The public representation of a site fetched from the API. */
export interface Site {
    address: string;
    title: string;
    html: string;
    authorId: string;
    createdAt: string;
    snippet?: string;
}
