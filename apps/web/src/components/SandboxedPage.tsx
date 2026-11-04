// apps/web/src/components/SandboxedPage.tsx
'use client';

interface SandboxedPageProps {
    html: string;
    title: string;
}

export function SandboxedPage({ html, title }: SandboxedPageProps) {
    // We use a styled wrapper to ensure the iframe behaves like a real webpage view.
    return (
        <iframe
            srcDoc={html}
            title={title}
            // The ultimate XSS defense: no scripts, no same-origin access.
            // Even if the backend sanitization misses something, the browser will block it.
            sandbox=""
            className="page-renderer"
        />
    );
}