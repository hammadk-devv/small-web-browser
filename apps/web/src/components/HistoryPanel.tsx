// apps/web/src/components/HistoryPanel.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Visit } from '@small-web/shared';
import { useBrowser } from '@/context/BrowserContext';
import { api } from '@/lib/api';

/**
 * Formats an ISO date string into a clean, human-readable time format.
 */
function formatVisitTime(isoString: string): string {
    try {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    } catch {
        return isoString;
    }
}

export function HistoryPanel() {
    const { personId, currentSite, navigate, closeOverlay } = useBrowser();
    const [visits, setVisits] = useState<Visit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadHistory = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getHistory(personId);
            // Ensure newest visits are displayed first (O(n log n))
            const sorted = [...data].sort(
                (a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()
            );
            setVisits(sorted);
        } catch {
            setError('Unable to load history from the database. Please verify the API connection.');
        } finally {
            setIsLoading(false);
        }
    }, [personId]);

    // Clear previous persona's history immediately on user switch, then fetch from API
    useEffect(() => {
        setVisits([]);
        loadHistory();
    }, [loadHistory]);

    return (
        <div className="panel-container">
            <div className="panel-header">
                <div>
                    <h2>Browsing History</h2>
                    <p className="panel-subtitle">Persistent visit logs stored in the database for {personId.replace('person_', '')}</p>
                </div>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={closeOverlay}
                    aria-label="Close history panel"
                >
                    Close
                </button>
            </div>

            {isLoading && (
                <div className="panel-state-message">
                    <div className="loading-spinner" aria-hidden="true" />
                    <span>Loading history records...</span>
                </div>
            )}

            {!isLoading && error && (
                <div className="alert-box alert-error">
                    <p>{error}</p>
                    <button type="button" className="btn-secondary btn-sm" onClick={loadHistory}>
                        Retry
                    </button>
                </div>
            )}

            {!isLoading && !error && visits.length === 0 && (
                <div className="panel-empty-state">
                    <p className="empty-title">No history yet</p>
                    <p className="empty-description">No visits recorded in the database for this profile.</p>
                </div>
            )}

            {!isLoading && !error && visits.length > 0 && (
                <ul className="history-list">
                    {visits.map((entry, index) => {
                        const isActive = currentSite?.address === entry.address;
                        return (
                            <li
                                key={`${entry.address}-${entry.visitedAt}-${index}`}
                                className={`history-item ${isActive ? 'active' : ''}`}
                                onClick={() => navigate(entry.address)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        navigate(entry.address);
                                    }
                                }}
                            >
                                <div className="history-meta">
                                    <strong className="history-title">{entry.title || 'Untitled Site'}</strong>
                                    <span className="history-address">{entry.address}</span>
                                </div>
                                <div className="history-time">
                                    {formatVisitTime(entry.visitedAt)}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
