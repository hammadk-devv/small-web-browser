// apps/api/src/common/sanitize.config.ts
import sanitizeHtml from 'sanitize-html';

/**
 * Security boundary for untrusted HTML.
 * Allows structural, typography, and styling elements,
 * while strictly discarding execution vectors (script, iframe, object, embed, form, input, button, textarea, select)
 * and stripping dangerous inline style attributes to prevent CSS-based injection vectors.
 */
export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'span', 'div', 'hr', 'style', 'header', 'nav', 'main', 'footer', 'section', 'article'
    ],
    allowedAttributes: {
        a: ['href', 'title', 'class'],
        '*': ['class'],
    },
    allowedSchemes: ['http', 'https'],
    disallowedTagsMode: 'discard',
    // Disallow executable, frame injection, and form manipulation tags
    exclusiveFilter: (frame) => {
        return ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select'].includes(frame.tag);
    },
};

/**
 * Utility to strip all HTML tags, styles, and scripts to build a searchable plain-text index.
 * Aggressively removes <style> and <script> blocks so CSS code does not bleed into search results.
 * Time Complexity: O(n) where n is the length of the HTML string.
 */
export function extractTextContent(html: string): string {
    // Strip <style> and <script> tags along with their inner contents
    const withoutStylesOrScripts = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ');

    return sanitizeHtml(withoutStylesOrScripts, {
        allowedTags: [],
        allowedAttributes: {},
        nonTextTags: ['style', 'script', 'textarea', 'option', 'noscript', 'iframe', 'noembed'],
        disallowedTagsMode: 'discard',
    })
        .replace(/\s+/g, ' ')
        .trim();
}
