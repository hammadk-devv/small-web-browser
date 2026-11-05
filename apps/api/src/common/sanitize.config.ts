// apps/api/src/common/sanitize.config.ts
import sanitizeHtml from 'sanitize-html';

export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'span', 'div', 'hr',
        'style', 'header', 'nav', 'main', 'footer', 'section', 'article', 'img'
    ],
    allowVulnerableTags: true,
    allowedAttributes: {
        a: ['href', 'title', 'class'],
        img: ['src', 'alt', 'class'],
        '*': ['class'],
    },
    allowedSchemes: ['http', 'https'],
    disallowedTagsMode: 'discard',
    exclusiveFilter: (frame) => {
        if (['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select'].includes(frame.tag)) {
            return true;
        }
        if (frame.tag === 'img' && frame.attribs.src) {
            const src = frame.attribs.src;
            const isSafe = src.startsWith('/assets/') || src.startsWith('http://') || src.startsWith('https://');
            if (!isSafe) return true;
        }
        if (frame.tag === 'style' && frame.text) {
            const css = frame.text.toLowerCase();
            if (/position\s*:\s*fixed/.test(css)) return true;
        }
        return false;
    },
};

/**
 * A wrapper around sanitizeHtml that explicitly protects <style> tags.
 * 
 * The `sanitize-html` library strips the contents of <style> tags even when 
 * the tag is allowed because it treats them as non-text nodes. 
 * 
 * To work around this, we extract <style> blocks into a temporary array,
 * replace them with a unique placeholder string, sanitize the HTML, and then
 * restore the styles.
 */
export function sanitizeWithStyles(html: string): string {
    const styleBlocks: string[] = [];

    // Replace <style>...</style> with placeholders
    const withPlaceholders = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (match) => {
        styleBlocks.push(match);
        return `___STYLE_PLACEHOLDER_${styleBlocks.length - 1}___`;
    });

    // Sanitize the HTML (placeholders are safe text)
    let sanitized = sanitizeHtml(withPlaceholders, SANITIZE_OPTIONS);

    // Restore the original style blocks
    sanitized = sanitized.replace(/___STYLE_PLACEHOLDER_(\d+)___/g, (_, index) => {
        return styleBlocks[parseInt(index, 10)];
    });

    return sanitized;
}

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