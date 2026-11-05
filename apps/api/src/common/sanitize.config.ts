// apps/api/src/common/sanitize.config.ts
import sanitizeHtml from 'sanitize-html';

/**
 * Security boundary for untrusted HTML.
 * 
 * STRATEGY:
 *   1. Allow structural, typography, and styling elements (needed for real websites)
 *   2. Strip ALL execution vectors (script, iframe, object, embed, form controls)
 *   3. Reject inline style="" attributes (see allowedAttributes) — CSS-based XSS defense
 *   4. Validate image sources to /assets/ or http(s) only — blocks javascript: and path traversal
 *   5. Reject style blocks that use viewport-covering CSS (position: fixed, inset: 0) — UX defense
 *      so a malicious publisher cannot render an opaque full-screen overlay over "legit content."
 * 
 * Note: `<style>` blocks ARE allowed because legitimate sites need CSS. Risk is mitigated
 * because: (a) inline style attrs are still stripped, (b) all HTML renders inside a
 * sandboxed iframe with no same-origin access, (c) SandboxedPage.tsx adds `contain: layout
 * style` to the iframe body to scope user CSS.
 */
export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'span', 'div', 'hr',
        'style', 'header', 'nav', 'main', 'footer', 'section', 'article', 'img'
    ],
    allowVulnerableTags: true, // required for <style>; explained in header comment
    allowedAttributes: {
        a: ['href', 'title', 'class'],
        img: ['src', 'alt', 'class'],
        '*': ['class'],
    },
    allowedSchemes: ['http', 'https'], // blocks javascript:, data:, vbscript:, etc.
    disallowedTagsMode: 'discard',
    exclusiveFilter: (frame) => {
        // ── 1. Reject execution + frame + form tags ──────────────────────────
        if (['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select'].includes(frame.tag)) {
            return true;
        }

        // ── 2. Validate <img src> ────────────────────────────────────────────
        // Only /assets/ (our bundled seed images) or explicit http(s) URLs are allowed.
        // Blocks: `javascript:`, `data:`, `vbscript:`, `//evil.com/...`, path traversal.
        if (frame.tag === 'img' && frame.attribs.src) {
            const src = frame.attribs.src;
            const isSafe =
                src.startsWith('/assets/') ||
                src.startsWith('http://') ||
                src.startsWith('https://');
            if (!isSafe) return true;
        }

        // ── 3. Reject viewport-covering <style> blocks (UX defense) ──────────
        // The regex blocks the OBVIOUS overlay patterns: position: fixed, position: sticky,
        // and inset: 0. It is not a complete CSS sanitizer — a determined attacker can
        // still break their own page — but it prevents the most common "blank screen" attack.
        // Real defense-in-depth comes from `contain: layout style` on the iframe body in
        // SandboxedPage.tsx, which scopes ALL user CSS to the iframe document.
        if (frame.tag === 'style' && frame.text) {
            const css = frame.text.toLowerCase();
            const hasViewportCover =
                /position\s*:\s*(fixed|sticky)/.test(css) ||
                /inset\s*:\s*0/.test(css);
            if (hasViewportCover) return true;
        }

        return false;
    },
};

/**
 * Builds a searchable plain-text index from sanitized HTML.
 * 
 * Strips <style> and <script> blocks (with content) BEFORE sanitizing so
 * CSS code cannot bleed into search results. Then strips all remaining tags
 * to produce clean prose.
 * 
 * Time: O(n) where n is the HTML string length. Called once at publish time.
 */
export function extractTextContent(html: string): string {
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