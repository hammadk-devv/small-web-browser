// packages/shared/src/navigation-stack.ts
import { HistoryEntry } from './types';

/**
 * Manages the back/forward/history semantics of the browser.
 * Encapsulates the invariant that forward history is destroyed upon a new push.
 * 
 * Time Complexity:
 * - push: O(n) due to slice, but n is bounded by human browsing session length.
 * - back/forward/jumpTo: O(1).
 * Space Complexity: O(n) where n is the number of entries in the current session.
 */
export class NavigationStack {
    private entries: HistoryEntry[];
    private cursor: number;

    constructor(initial?: HistoryEntry) {
        this.entries = initial ? [initial] : [];
        this.cursor = initial ? 0 : -1;
    }

    get current(): HistoryEntry | null {
        return this.cursor >= 0 && this.cursor < this.entries.length
            ? this.entries[this.cursor]
            : null;
    }

    get canGoBack(): boolean {
        return this.cursor > 0;
    }

    get canGoForward(): boolean {
        return this.cursor < this.entries.length - 1;
    }

    /**
     * Exposes the cursor's current position without leaking the internal field.
     * Used by the UI to highlight the active entry in the history panel.
     */
    get currentIndex(): number {
        return this.cursor;
    }

    /**
     * Navigates to a new page. 
     * Truncates any "forward" history, simulating real browser behavior.
     */
    push(entry: HistoryEntry): void {
        // Drop everything ahead of the current cursor
        this.entries = this.entries.slice(0, this.cursor + 1);
        this.entries.push(entry);
        this.cursor = this.entries.length - 1;
    }

    back(): HistoryEntry | null {
        if (!this.canGoBack) return null;
        this.cursor -= 1;
        return this.current;
    }

    forward(): HistoryEntry | null {
        if (!this.canGoForward) return null;
        this.cursor += 1;
        return this.current;
    }

    /** Used for jumping from the history panel. */
    jumpTo(index: number): HistoryEntry | null {
        if (index < 0 || index >= this.entries.length) return null;
        this.cursor = index;
        return this.current;
    }

    /** Returns an immutable copy for rendering the history UI. */
    toArray(): readonly HistoryEntry[] {
        return [...this.entries];
    }
}