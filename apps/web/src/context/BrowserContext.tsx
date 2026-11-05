// apps/web/src/context/BrowserContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { NavigationStack, HistoryEntry, Site } from '@small-web/shared';
import { api } from '@/lib/api';

export type ViewState = 'HOME' | 'SITE' | 'SEARCH' | 'HISTORY' | 'PUBLISH';

export interface BrowserContextType {
    personId: string;
    setPersonId: (id: string) => void;

    currentSite: Site | null;
    currentError: string | null;
    viewState: ViewState;
    previousViewState: ViewState;
    setViewState: (state: ViewState) => void;

    currentAddress: string;
    searchQuery: string;
    searchResults: Site[] | null;

    canGoBack: boolean;
    canGoForward: boolean;

    navigate: (address: string) => Promise<void>;
    goBack: () => void;
    goForward: () => void;

    performSearch: (query: string) => Promise<void>;
    clearSearch: () => void;
    closeOverlay: () => void;

    openHistory: () => void;
    openPublish: () => void;
    openHome: () => void;
}

const BrowserContext = createContext<BrowserContextType | null>(null);

export function BrowserProvider({ children }: { children: React.ReactNode }) {
    // 1. Persona State
    const [personId, setPersonIdState] = useState<string>('person_alice');

    // 2. Navigation State & Overlay Tracking
    const stackRef = useRef<NavigationStack>(new NavigationStack());
    const requestIdRef = useRef(0);
    const [currentSite, setCurrentSite] = useState<Site | null>(null);
    const [currentError, setCurrentError] = useState<string | null>(null);
    const [viewState, setViewState] = useState<ViewState>('HOME');
    // Stores the base view ('HOME' | 'SITE') prior to opening an overlay
    const [previousViewState, setPreviousViewState] = useState<ViewState>('HOME');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Site[] | null>(null);

    // 3. UI Reactivity for Navigation Stack updates
    const [stackVersion, setStackVersion] = useState(0);
    const forceUpdate = useCallback(() => setStackVersion((v) => v + 1), []);

    /**
     * Loads a site by address from the API and records the visit event non-blockingly.
     * Sets viewState to 'SITE' on both success and 404, returning immediately.
     */
    const loadSite = useCallback(async (address: string, referrer?: string) => {
        try {
            setCurrentError(null);
            const site = await api.getSite(address);
            setCurrentSite(site);
            setViewState('SITE');

            api.recordVisit({
                personId,
                address: site.address,
                title: site.title,
                referrer,
            }).catch((err) => console.error('Failed to record visit:', err));

            return site;
        } catch {
            // Record broken link attempt non-blockingly so history reflects browsing navigation
            setCurrentSite(null);
            setCurrentError(`Nowhere found at address: ${address}`);
            setViewState('SITE');

            api.recordVisit({
                personId,
                address,
                title: 'Nowhere',
                referrer,
            }).catch((err) => console.error('Failed to record visit:', err));
            return null;
        }
    }, [personId]);

    /**
     * Centralized dispatcher for history stack navigation (Back / Forward).
     * Handles 'home://', 'search://{query}', and standard site addresses.
     * Uses requestIdRef guard to prevent race conditions during rapid navigations.
     */
    const handleHistoryEntry = useCallback(async (entry: HistoryEntry | null) => {
        if (!entry) return;

        // 1. Home state restoration
        if (entry.address === 'home://') {
            setCurrentSite(null);
            setCurrentError(null);
            setSearchQuery('');
            setSearchResults(null);
            setViewState('HOME');
            setPreviousViewState('HOME');
            forceUpdate();
            return;
        }

        // 2. Search state restoration (Chrome behavior)
        if (entry.address.startsWith('search://')) {
            const query = entry.address.replace(/^search:\/\//, '');
            setSearchQuery(query);
            setCurrentSite(null);
            setCurrentError(null);
            setViewState('SEARCH');
            setPreviousViewState('SITE');

            try {
                const results = await api.search(query);
                setSearchResults(results);
            } catch {
                setSearchResults([]);
            }
            forceUpdate();
            return;
        }

        // 3. Regular site navigation with race condition guard
        const requestId = ++requestIdRef.current;
        setPreviousViewState('SITE');
        setSearchQuery('');
        setSearchResults(null);
        await loadSite(entry.address);

        if (requestId !== requestIdRef.current) return;
        forceUpdate();
    }, [loadSite, forceUpdate]);

    const navigate = useCallback(async (address: string) => {
        const requestId = ++requestIdRef.current;

        // If navigating from initial HOME with an empty stack, push home:// first so Back can return to HOME
        if (viewState === 'HOME' && stackRef.current.current === null) {
            stackRef.current.push({
                address: 'home://',
                title: 'The Small Web',
                visitedAt: new Date().toISOString(),
            });
        }

        setSearchQuery('');
        setSearchResults(null);
        setPreviousViewState('SITE');

        const referrer = stackRef.current.current?.address;
        const result = await loadSite(address, referrer);

        // Guard against stale in-flight navigations overwriting the stack
        if (requestId !== requestIdRef.current) return;

        stackRef.current.push({
            address,
            title: result ? result.title : 'Nowhere',
            visitedAt: new Date().toISOString(),
        });

        forceUpdate();
    }, [viewState, loadSite, forceUpdate]);

    const goBack = useCallback(() => {
        const entry = stackRef.current.back();
        if (entry) {
            handleHistoryEntry(entry);
        }
    }, [handleHistoryEntry]);

    const goForward = useCallback(() => {
        const entry = stackRef.current.forward();
        if (entry) {
            handleHistoryEntry(entry);
        }
    }, [handleHistoryEntry]);

    /**
     * Executes a search query and records the search on the navigation stack (Chrome semantics).
     * Pushes 'search://{query}' so Back/Forward properly returns to search results.
     */
    const performSearch = useCallback(async (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return;

        // If currently on HOME with an empty stack, establish home:// baseline so Back navigates back to HOME
        if (viewState === 'HOME' && stackRef.current.current === null) {
            stackRef.current.push({
                address: 'home://',
                title: 'The Small Web',
                visitedAt: new Date().toISOString(),
            });
        }

        setSearchQuery(trimmed);
        setCurrentSite(null);
        setCurrentError(null);
        setViewState('SEARCH');
        setPreviousViewState((current) => {
            if (current === 'HOME' || current === 'SITE') {
                return current;
            }
            return 'HOME';
        });

        // Push search:// entry onto NavigationStack if not already current
        if (stackRef.current.current?.address !== `search://${trimmed}`) {
            stackRef.current.push({
                address: `search://${trimmed}`,
                title: `Search: ${trimmed}`,
                visitedAt: new Date().toISOString(),
            });
        }
        forceUpdate();

        try {
            const results = await api.search(trimmed);
            setSearchResults(results);
        } catch {
            setSearchResults([]);
        }
    }, [viewState, forceUpdate]);

    /**
     * Safely closes an overlay (History, Search, Publish).
     * If closing search while search:// is on top of stack, steps back on stack.
     * Otherwise restores previousViewState (HOME or valid error-free SITE).
     */
    const closeOverlay = useCallback(() => {
        if (stackRef.current.current?.address.startsWith('search://') && stackRef.current.canGoBack) {
            goBack();
            return;
        }

        if (previousViewState === 'SITE' && currentSite && !currentError) {
            setViewState('SITE');
        } else {
            setCurrentError(null);
            setViewState('HOME');
        }
    }, [previousViewState, currentSite, currentError, goBack]);

    const clearSearch = useCallback(() => {
        setSearchResults(null);
        setSearchQuery('');
        closeOverlay();
    }, [closeOverlay]);

    const openHistory = useCallback(() => {
        setViewState((current) => {
            if (current === 'HOME' || current === 'SITE') {
                setPreviousViewState(current);
            }
            return 'HISTORY';
        });
    }, []);

    const openPublish = useCallback(() => {
        setViewState((current) => {
            if (current === 'HOME' || current === 'SITE') {
                setPreviousViewState(current);
            }
            return 'PUBLISH';
        });
    }, []);

    /**
     * Navigates to HOME screen, recording home:// on the NavigationStack
     * so Back correctly returns to the previously viewed site.
     */
    const openHome = useCallback(() => {
        // Push home:// onto stack so Back correctly returns to the last site
        if (stackRef.current.current?.address !== 'home://') {
            stackRef.current.push({
                address: 'home://',
                title: 'The Small Web',
                visitedAt: new Date().toISOString(),
            });
        }
        setPreviousViewState('HOME');
        setCurrentSite(null);
        setCurrentError(null);
        setSearchQuery('');
        setSearchResults(null);
        setViewState('HOME');
        forceUpdate();
    }, [forceUpdate]);

    /**
     * Switches user persona, resetting session stack and returning to HOME.
     */
    const setPersonId = useCallback((id: string) => {
        setPersonIdState(id);
        stackRef.current = new NavigationStack();
        setCurrentSite(null);
        setCurrentError(null);
        setSearchResults(null);
        setSearchQuery('');
        setPreviousViewState('HOME');
        setViewState('HOME');
        forceUpdate();
    }, [forceUpdate]);

    /**
     * Computes the current address value:
     * - Returns searchQuery if on SEARCH
     * - Returns stack address if on SITE
     * - Returns "" if viewState !== 'SITE' (HOME, HISTORY, PUBLISH)
     */
    const currentAddress = useMemo(() => {
        if (viewState === 'SEARCH') {
            return searchQuery;
        }
        if (viewState === 'SITE') {
            return stackRef.current.current?.address ?? '';
        }
        return '';
    }, [viewState, searchQuery, stackVersion]);

    return (
        <BrowserContext.Provider
            value={{
                personId,
                setPersonId,
                currentSite,
                currentError,
                viewState,
                previousViewState,
                setViewState,
                searchResults,
                searchQuery,
                currentAddress,
                canGoBack: stackRef.current.canGoBack,
                canGoForward: stackRef.current.canGoForward,
                navigate,
                goBack,
                goForward,
                performSearch,
                clearSearch,
                closeOverlay,
                openHistory,
                openPublish,
                openHome,
            }}
        >
            {children}
        </BrowserContext.Provider>
    );
}

export function useBrowser() {
    const ctx = useContext(BrowserContext);
    if (!ctx) throw new Error('useBrowser must be used within BrowserProvider');
    return ctx;
}
