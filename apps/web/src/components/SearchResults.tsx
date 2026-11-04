// apps/web/src/components/SearchResults.tsx
'use client';

import { Site } from '@small-web/shared';
import { useBrowser } from '@/context/BrowserContext';

export function SearchResults({ results, onClose }: { results: Site[], onClose: () => void }) {
    const browser = useBrowser();

    return (
        <div className="panel-container">
            <div className="panel-header">
                <h2>Search Results</h2>
                <button className="btn-close" onClick={onClose}>Back to Page</button>
            </div>

            {results.length === 0 ? (
                <p>No pages found matching your query.</p>
            ) : (
                results.map((site) => (
                    <div
                        key={site.address}
                        className="result-item"
                        onClick={() => browser.navigate(site.address)}
                    >
                        <h3>{site.title}</h3>
                        <div className="address">{site.address}</div>
                        {/* We strip the HTML tags for the snippet in the backend, but here we can just truncate the raw text for now */}
                        <div className="snippet">{site.title} — published by {site.authorId}</div>
                    </div>
                ))
            )}
        </div>
    );
}