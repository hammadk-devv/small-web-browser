// apps/web/src/components/BrowserShell.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { SandboxedPage } from './SandboxedPage';
import { SearchResults } from './SearchResults';
import { HistoryPanel } from './HistoryPanel';

export function BrowserShell() {
    const browser = useBrowser();
    const [addressInput, setAddressInput] = useState('');

    const handleAddressSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!addressInput.trim()) return;
        browser.navigate(addressInput.trim());
        setAddressInput(''); // Reset input
    };

    return (
        <div className="browser-shell">
            {/* --- Browser Chrome --- */}
            <div className="browser-chrome">
                <div className="nav-buttons">
                    <button className="nav-btn" onClick={browser.goBack} disabled={!browser.canGoBack}>
                        &#8592; {/* Left Arrow */}
                    </button>
                    <button className="nav-btn" onClick={browser.goForward} disabled={!browser.canGoForward}>
                        &#8594; {/* Right Arrow */}
                    </button>
                    <button className="nav-btn" onClick={browser.openHistory} title="History">
                        &#128337; {/* Clock icon */}
                    </button>
                </div>

                <form className="address-bar-form" onSubmit={handleAddressSubmit}>
                    <input
                        type="text"
                        className="address-bar-input"
                        placeholder="Type an address..."
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                    />
                </form>

                <div className="person-selector">
                    <label>Browsing as:</label>
                    <select
                        value={browser.personId}
                        onChange={(e) => browser.setPersonId(e.target.value)}
                    >
                        <option value="person_alice">Alice</option>
                        <option value="person_bob">Bob</option>
                        <option value="person_charlie">Charlie</option>
                        <option value="person_diana">Diana</option>
                    </select>
                </div>
            </div>

            {/* --- Browser Content Area --- */}
            <div className="browser-content">

                {/* View: Search Results */}
                {browser.viewState === 'SEARCH' && browser.searchResults && (
                    <SearchResults
                        results={browser.searchResults}
                        onClose={browser.clearSearch}
                    />
                )}

                {/* View: History Panel */}
                {browser.viewState === 'HISTORY' && (
                    <HistoryPanel />
                )}

                {/* View: A Page (or Error) */}
                {browser.viewState === 'SITE' && (
                    <>
                        {browser.currentError ? (
                            <div className="error-screen">
                                <h2>This page is nowhere.</h2>
                                <p>{browser.currentError}</p>
                            </div>
                        ) : browser.currentSite ? (
                            <SandboxedPage html={browser.currentSite.html} title={browser.currentSite.title} />
                        ) : null}
                    </>
                )}

                {/* View: Home */}
                {browser.viewState === 'HOME' && (
                    <div className="home-screen">
                        <h1>The Small Web</h1>
                        <p>Type an address above to start exploring.</p>
                        <div style={{ marginTop: '24px' }}>
                            <button
                                className="nav-btn"
                                style={{ border: '1px solid var(--line)', background: 'var(--card)' }}
                                onClick={() => browser.openHistory()}
                            >
                                View History
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}