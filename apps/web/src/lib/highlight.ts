// apps/web/src/lib/highlight.ts

/**
 * A contiguous run of text within a snippet, tagged as matching or not.
 * This is the atomic unit of highlighted rendering.
 */
export interface HighlightSegment {
    text: string;
    isMatch: boolean;
}

/**
 * Splits a string into segments, isolating every occurrence of `query`.
 * 
 * Security: Uses React text nodes (rendered via `{segment.text}`) — never
 * `dangerouslySetInnerHTML`. The query is escaped before regex construction
 * to prevent regex injection (e.g., "." or "*" in the query cannot become
 * wildcards that crash the pattern).
 * 
 * Performance: Single pass through the string. O(n) where n is the snippet
 * length. For a 180-char snippet this is trivially fast — no memoization
 * needed at the utility level.
 * 
 * Empty queries return a single non-matching segment (the whole string).
 * 
 * @param text  The full snippet text (already stripped of HTML by the backend)
 * @param query The user's search query (may be empty)
 * @returns Array of segments ready for `<mark>` rendering
 */
export function highlightSegments(text: string, query: string): HighlightSegment[] {
    const trimmedQuery = query.trim();

    // Fast path: no query, no matching, no allocation of extra structures.
    if (!trimmedQuery) {
        return [{ text, isMatch: false }];
    }

    // Escape regex metacharacters so `.` matches a literal dot, `*` a literal
    // asterisk, and so on. This is defense-in-depth against regex injection.
    const escaped = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // `gi` = global + case-insensitive. We use a capture-group-free pattern so
    // `String.prototype.split` retains the matched delimiters when we re-walk
    // the split output below.
    const regex = new RegExp(`(${escaped})`, 'gi');

    // `split` with a capturing group interleaves matches and non-matches:
    //   "Tidepool Field Notes".split(/(pool)/gi)
    //     => ["Tide", "pool", " Field Notes"]
    // This gives us everything we need in one pass.
    const parts = text.split(regex);

    // Convert the interleaved array into typed segments.
    const segments: HighlightSegment[] = [];
    for (const part of parts) {
        if (!part) continue; // split can produce empty strings
        // A part is a match iff it equals the query, case-insensitively.
        // (split with a capturing group returns the match verbatim.)
        const isMatch = part.toLowerCase() === trimmedQuery.toLowerCase();
        segments.push({ text: part, isMatch });
    }

    return segments;
}