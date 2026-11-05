// apps/web/src/components/SearchResults.tsx
'use client';

import { Site } from '@small-web/shared';
import { useBrowser } from '@/context/BrowserContext';
import { highlightSegments } from '@/lib/highlight';

interface SearchResultsProps {
    results: Site[];
    onClose: () => void;
}

/**
 * Renders a piece of text with all occurrences of `query` wrapped in <mark>.
 * 
 * WHY A SEPARATE COMPONENT: Extracting this from SearchResults keeps the
 * parent's JSX readable and gives React a stable component identity to
 * reconcile — future memoization (if ever needed) becomes a one-line change.
 * 
 * SECURITY: Uses React text nodes (`{segment.text}`) instead of
 * `dangerouslySetInnerHTML`. Even if a snippet contained `<script>`, it would
 * render as visible text, not execute.
 */
function HighlightedText({ text, query }: { text: string; query: string }) {
    const segments = highlightSegments(text, query);

    return (
        <>
            {segments.map((segment, index) =>
                segment.isMatch ? (
                    <mark key={index} className="search-highlight">
                        {segment.text}
                    </mark>
                ) : (
                    <span key={index}>{segment.text}</span>
                )
            )}
        </>
    );
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
                                <h3 className="result-title">
                                    <HighlightedText
                                        text={site.title || 'Untitled Site'}
                                        query={searchQuery}
                                    />
                                </h3>
                                <span className="result-address">
                                    <HighlightedText
                                        text={site.address}
                                        query={searchQuery}
                                    />
                                </span>
                            </div>
                            <p className="result-snippet">
                                <HighlightedText
                                    text={site.snippet || ''}
                                    query={searchQuery}
                                />
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}