// apps/web/src/context/BrowserContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { NavigationStack, HistoryEntry, Site } from '@small-web/shared';
import { api } from '@/lib/api';

type ViewState = 'HOME' | 'SITE' | 'SEARCH' | 'HISTORY' | 'PUBLISH';

interface BrowserContextType {
    personId: string;
    setPersonId: (id: string) => void;

    currentSite: Site | null;
    currentError: string | null;
    viewState: ViewState;

    searchResults: Site[] | null;

    canGoBack: boolean;
    canGoForward: boolean;
    historyEntries: readonly HistoryEntry[];
    currentHistoryIndex: number;

    navigate: (address: string) => Promise<void>;
    goBack: () => void;
    goForward: () => void;
    jumpToHistory: (index: number) => void;

    performSearch: (query: string) => Promise<void>;
    clearSearch: () => void;

    openHistory: () => void;
    openHome: () => void;
}

const BrowserContext = createContext<BrowserContextType | null>(null);

export function BrowserProvider({ children }: { children: React.ReactNode }) {
    // 1. Person State (For history)
    const [personId, setPersonIdState] = useState<string>('person_alice');

    // 2. Navigation State
    const stackRef = useRef<NavigationStack>(new NavigationStack());
    const [currentSite, setCurrentSite] = useState<Site | null>(null);
    const [currentError, setCurrentError] = useState<string | null>(null);
    const [viewState, setViewState] = useState<ViewState>('HOME');
    const [searchResults, setSearchResults] = useState<Site[] | null>(null);

    // 3. UI Reactivity for Back/Forward
    const [stackVersion, setStackVersion] = useState(0); // Forces re-render when stack mutates
    const forceUpdate = () => setStackVersion(v => v + 1);

    // The core navigation function that ties the stack and API together
    const loadSite = useCallback(async (address: string, referrer?: string) => {
        try {
            setCurrentError(null);
            const site = await api.getSite(address);
            setCurrentSite(site);
            setViewState('SITE');

            // Record the visit in the DB
            await api.recordVisit({
                personId,
                address: site.address,
                title: site.title,
                referrer
            });

            return site;
        } catch (err: any) {
            // Even if the site is broken, we record the visit attempt so history works
            setCurrentSite(null);
            setCurrentError(`Nowhere found at address: ${address}`);
            setViewState('SITE');

            await api.recordVisit({
                personId,
                address,
                title: 'Nowhere',
                referrer,
            });
        }
    }, [personId]);

    const navigate = useCallback(async (address: string) => {
        const referrer = stackRef.current.current?.address;
        const result = await loadSite(address, referrer);

        // Push to our custom stack
        stackRef.current.push({
            address,
            title: result ? result.title : 'Nowhere',
            visitedAt: new Date().toISOString(),
        });

        forceUpdate();
    }, [loadSite]);

    const goBack = useCallback(() => {
        const entry = stackRef.current.back();
        if (entry) {
            loadSite(entry.address);
            forceUpdate();
        }
    }, [loadSite]);

    const goForward = useCallback(() => {
        const entry = stackRef.current.forward();
        if (entry) {
            loadSite(entry.address);
            forceUpdate();
        }
    }, [loadSite]);

    const jumpToHistory = useCallback((index: number) => {
        const entry = stackRef.current.jumpTo(index);
        if (entry) {
            loadSite(entry.address);
            forceUpdate();
        }
    }, [loadSite]);

    const performSearch = useCallback(async (query: string) => {
        setSearchResults(await api.search(query));
        setViewState('SEARCH');
    }, []);

    const clearSearch = useCallback(() => setViewState('SITE'), []);

    const openHistory = useCallback(() => setViewState('HISTORY'), []);
    const openHome = useCallback(() => setViewState('HOME'), []);

    const setPersonId = useCallback((id: string) => {
        setPersonIdState(id);
        // Reset the stack when switching users
        stackRef.current = new NavigationStack();
        setViewState('HOME');
        forceUpdate();
    }, []);

    return (
        <BrowserContext.Provider
            value={{
                personId, setPersonId,
                currentSite, currentError, viewState, searchResults,
                canGoBack: stackRef.current.canGoBack,
                canGoForward: stackRef.current.canGoForward,
                historyEntries: stackRef.current.toArray(),
                currentHistoryIndex: stackRef.current['cursor'] ?? -1,
                navigate, goBack, goForward, jumpToHistory,
                performSearch, clearSearch,
                openHistory, openHome,
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