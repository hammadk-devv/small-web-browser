// apps/web/src/components/HistoryPanel.tsx
'use client';

import { useBrowser } from '@/context/BrowserContext';

export function HistoryPanel() {
    const browser = useBrowser();

    return (
        <div className="panel-container">
            <div className="panel-header">
                <h2>Browsing History</h2>
                <button className="btn-close" onClick={() => browser.clearSearch()}>Close</button>
            </div>

            <ul className="history-list">
                {browser.historyEntries.map((entry, index) => {
                    const isActive = index === browser.currentHistoryIndex;

                    return (
                        <li
                            key={`${entry.address}-${index}`}
                            className={`history-item ${isActive ? 'active' : ''}`}
                            onClick={() => browser.jumpToHistory(index)}
                        >
                            <div className="history-meta">
                                <strong>{entry.title}</strong>
                                <span>{entry.address}</span>
                            </div>
                            <div className="history-time">
                                {new Date(entry.visitedAt).toLocaleTimeString()}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}