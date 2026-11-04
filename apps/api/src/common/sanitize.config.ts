// apps/api/src/common/sanitize.config.ts
import sanitizeHtml from 'sanitize-html';

/**
 * Security boundary for untrusted HTML.
 * We allow structural and formatting tags, but strictly forbid 
 * anything that can execute scripts (iframe, script, object, embed).
 * Event handlers (onclick, onerror) and javascript: URIs are stripped.
 */
export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'span', 'div', 'hr'
    ],
    allowedAttributes: {
        a: ['href', 'title'], // Only safe attributes on links
    },
    allowedSchemes: ['http', 'https'], // Blocks javascript:alert(1)
    disallowedTagsMode: 'discard',
    // Explicitly ensure these dangerous tags are destroyed
    exclusiveFilter: (frame) => {
        return ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'].includes(frame.tag);
    },
};

/**
 * Utility to strip all HTML tags to build a searchable plain-text index.
 * Time Complexity: O(n) where n is the length of the HTML string.
 */
export function extractTextContent(html: string): string {
    return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
}