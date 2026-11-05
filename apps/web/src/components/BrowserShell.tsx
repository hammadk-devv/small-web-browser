// apps/web/src/components/BrowserShell.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { SandboxedPage } from './SandboxedPage';
import { SearchResults } from './SearchResults';
import { HistoryPanel } from './HistoryPanel';
import { PublishForm } from './PublishForm';

export function BrowserShell() {
    const browser = useBrowser();
    const [addressInput, setAddressInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Keep address bar synced with browser navigation when user is not actively typing
    useEffect(() => {
        if (!isTyping) {
            setAddressInput(browser.currentAddress);
        }
    }, [browser.currentAddress, isTyping]);

    const handleAddressSubmit = (e: FormEvent) => {
        e.preventDefault();
        const input = addressInput.trim();
        if (!input) return;

        // Heuristic: Navigates if input resembles a domain (has dot and no spaces), else performs search
        if (input.includes('.') && !input.includes(' ')) {
            browser.navigate(input);
        } else {
            browser.performSearch(input);
        }

        setIsTyping(false);
        (e.target as HTMLFormElement).querySelector('input')?.blur();
    };

    return (
        <div className="browser-shell">
            {/* --- Fixed YouTube-Style Top Navigation Bar (100% Width) --- */}
            <header className="browser-chrome" role="banner">
                {/* Left Section: Brand & Navigation Controls */}
                <div className="chrome-section chrome-left">
                    <button
                        type="button"
                        className="brand-logo-btn"
                        onClick={browser.openHome}
                        title="Small Web Home"
                        aria-label="Small Web Home"
                    >
                        <span className="brand-dot" aria-hidden="true" />
                        <span className="brand-name">Small Web</span>
                    </button>

                    <div className="nav-controls" role="group" aria-label="Page Navigation">
                        <button
                            type="button"
                            className="nav-btn"
                            onClick={browser.goBack}
                            disabled={!browser.canGoBack}
                            title="Go Back"
                            aria-label="Go Back"
                        >
                            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M19 12H5" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="nav-btn"
                            onClick={browser.goForward}
                            disabled={!browser.canGoForward}
                            title="Go Forward"
                            aria-label="Go Forward"
                        >
                            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className={`nav-btn ${browser.viewState === 'HOME' ? 'active' : ''}`}
                            onClick={browser.openHome}
                            title="Home"
                            aria-label="Home"
                        >
                            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Center Section: Rounded Inset Omnibox / Search Bar */}
                <div className="chrome-section chrome-center">
                    <form className="address-bar-form" onSubmit={handleAddressSubmit}>
                        <div className="address-bar-container">
                            <span className="address-bar-leading-icon" aria-hidden="true">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                className="address-bar-input"
                                placeholder="Search or type address (e.g. tidepool.zz, shore.zz)..."
                                value={addressInput}
                                onChange={(e) => {
                                    setAddressInput(e.target.value);
                                    setIsTyping(true);
                                }}
                                onBlur={() => setIsTyping(false)}
                                aria-label="Address or search query"
                            />
                            {addressInput && (
                                <button
                                    type="button"
                                    className="address-bar-clear-btn"
                                    onClick={() => {
                                        setAddressInput('');
                                        setIsTyping(true);
                                    }}
                                    aria-label="Clear address input"
                                    tabIndex={-1}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Right Section: Action Controls & User Persona */}
                <div className="chrome-section chrome-right">
                    <div className="action-controls" role="group" aria-label="Browser Actions">
                        <button
                            type="button"
                            className={`nav-btn ${browser.viewState === 'HISTORY' ? 'active' : ''}`}
                            onClick={browser.openHistory}
                            title="Browsing History"
                            aria-label="Browsing History"
                        >
                            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </button>

                        {/* Distinct Solid Purple Publish Button with White Icon */}
                        <button
                            type="button"
                            className={`btn-publish-chrome ${browser.viewState === 'PUBLISH' ? 'active' : ''}`}
                            onClick={browser.openPublish}
                            title="Publish a Site"
                            aria-label="Publish a Site"
                        >
                            <svg className="publish-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <span className="btn-publish-text">Publish</span>
                        </button>
                    </div>

                    <div className="person-selector" title="Active browsing profile">
                        <svg className="person-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <select
                            value={browser.personId}
                            onChange={(e) => browser.setPersonId(e.target.value)}
                            aria-label="Active browsing persona"
                        >
                            <option value="person_alice">Alice</option>
                            <option value="person_bob">Bob</option>
                            <option value="person_charlie">Charlie</option>
                            <option value="person_diana">Diana</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* --- Main Viewport Canvas with Smooth Page Transitions --- */}
            <main className="browser-content" role="main">
                {/* View: Search Results */}
                {browser.viewState === 'SEARCH' && browser.searchResults && (
                    <div className="view-animated-container" key="search-view">
                        <SearchResults
                            results={browser.searchResults}
                            onClose={browser.closeOverlay}
                        />
                    </div>
                )}

                {/* View: History Panel */}
                {browser.viewState === 'HISTORY' && (
                    <div className="view-animated-container" key="history-view">
                        <HistoryPanel />
                    </div>
                )}

                {/* View: Publish Form */}
                {browser.viewState === 'PUBLISH' && (
                    <div className="view-animated-container" key="publish-view">
                        <PublishForm />
                    </div>
                )}

                {/* View: Active Site Render or 404 Notice */}
                {browser.viewState === 'SITE' && (
                    <div className="view-animated-container" key={browser.currentSite?.address || 'error-view'}>
                        {browser.currentError ? (
                            <div className="error-screen">
                                <div className="error-card">
                                    <div className="error-status-badge">404 Error</div>
                                    <h2>This page is nowhere.</h2>
                                    <p className="error-detail">{browser.currentError}</p>
                                    <div className="error-actions">
                                        <button
                                            type="button"
                                            className="btn-primary"
                                            onClick={browser.openHome}
                                        >
                                            Return to Safety
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={browser.openHistory}
                                        >
                                            View History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : browser.currentSite ? (
                            <SandboxedPage
                                html={browser.currentSite.html}
                                title={browser.currentSite.title}
                            />
                        ) : null}
                    </div>
                )}

                {/* View: Home Screen */}
                {browser.viewState === 'HOME' && (
                    <div className="home-screen view-animated-container" key="home-view">
                        <div className="bg-blob-container" aria-hidden="true">
                            <div className="bg-blob bg-blob-1" />
                            <div className="bg-blob bg-blob-2" />
                            <div className="bg-blob bg-blob-3" />
                        </div>
                        <div className="home-container">
                            <div className="home-badge">Decentralized Web Explorer</div>
                            <h1 className="home-title">The Small Web</h1>
                            <p className="home-description">
                                A calm, independent corner of the internet. Enter an address or explore verified community-published sites.
                            </p>

                            <div className="home-actions">
                                <button
                                    type="button"
                                    className="btn-premium"
                                    onClick={browser.openPublish}
                                >
                                    Publish a Site
                                </button>
                                <button
                                    type="button"
                                    className="btn-premium-outline"
                                    onClick={browser.openHistory}
                                >
                                    Browsing History
                                </button>
                            </div>

                            {/* Real seeded site suggestions as interactive pill buttons */}
                            <div className="home-quick-links">
                                <span className="quick-links-label">Featured Sites:</span>
                                <button
                                    type="button"
                                    className="quick-link-chip"
                                    onClick={() => browser.navigate('tidepool.zz')}
                                    title="Explore Tidepool Field Notes"
                                >
                                    tidepool.zz
                                </button>
                                <button
                                    type="button"
                                    className="quick-link-chip"
                                    onClick={() => browser.navigate('shore.zz')}
                                    title="Explore The Shoreline"
                                >
                                    shore.zz
                                </button>
                                <button
                                    type="button"
                                    className="quick-link-chip"
                                    onClick={() => browser.navigate('garden.zz')}
                                    title="Explore Digital Garden"
                                >
                                    garden.zz
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
