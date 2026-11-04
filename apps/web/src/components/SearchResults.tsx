// apps/web/src/components/SearchResults.tsx
'use client';

import { Site } from '@small-web/shared';
import { useBrowser } from '@/context/BrowserContext';

interface SearchResultsProps {
    results: Site[];
    onClose: () => void;
}

export function SearchResults({ results, onClose }: SearchResultsProps) {
    const { navigate, searchQuery } = useBrowser();

    return (
        <div className="panel-container">
            <div className="panel-header">
                <div>
                    <h2>Search Results</h2>
                    <p className="panel-subtitle">
                        {results.length} {results.length === 1 ? 'page' : 'pages'} found
                        {searchQuery ? ` for "${searchQuery}"` : ''}
                    </p>
                </div>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={onClose}
                    aria-label="Close search results"
                >
                    Close
                </button>
            </div>

            {results.length === 0 ? (
                <div className="panel-empty-state">
                    <p className="empty-title">No results found</p>
                    <p className="empty-description">
                        Try searching with different keywords or check the exact web address.
                    </p>
                </div>
            ) : (
                <div className="search-results-list">
                    {results.map((site) => (
                        <div
                            key={site.address}
                            className="result-card"
                            onClick={() => navigate(site.address)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    navigate(site.address);
                                }
                            }}
                        >
                            <div className="result-header">
                                <h3 className="result-title">{site.title || 'Untitled Site'}</h3>
                                <span className="result-address">{site.address}</span>
                            </div>
                            <p className="result-snippet">{site.snippet || ''}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
