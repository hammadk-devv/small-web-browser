// apps/web/src/components/SandboxedPage.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useBrowser } from '@/context/BrowserContext';

interface SandboxedPageProps {
    html: string;
    title: string;
}

export function SandboxedPage({ html, title }: SandboxedPageProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const browser = useBrowser();

    // Listen for link click navigation messages dispatched from the iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Security: accept messages only from our sandboxed iframe instance
            if (event.source !== iframeRef.current?.contentWindow) return;

            if (event.data?.type === 'NAVIGATE' && typeof event.data.address === 'string') {
                browser.navigate(event.data.address);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [browser]);

    // Inject base modern styling and interceptor script into the iframe HTML
    const augmentedHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html {
            margin: 0;
            padding: 0;
            min-height: 100%;
          }

          body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #FAFAFA;
            color: #111111;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", Helvetica, Arial, sans-serif;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }

          /* Default centered layout applied when no full-screen container (e.g. .site-wrap) is provided */
          body:not(:has(.site-wrap)) {
            max-width: 680px;
            margin: 40px auto;
            padding: 0 24px;
          }

          body:not(:has(.site-wrap)) h1 {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1.25;
            margin-top: 0;
            margin-bottom: 16px;
            color: #111111;
          }

          body:not(:has(.site-wrap)) h2 {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.3;
            margin-top: 32px;
            margin-bottom: 12px;
            color: #111111;
          }

          body:not(:has(.site-wrap)) h3 {
            font-size: 18px;
            font-weight: 600;
            margin-top: 24px;
            margin-bottom: 8px;
            color: #111111;
          }

          body:not(:has(.site-wrap)) p {
            font-size: 15.5px;
            line-height: 1.65;
            color: #333333;
            margin: 0 0 18px;
          }

          body:not(:has(.site-wrap)) a {
            color: #6F4C7A;
            text-decoration: underline;
            text-underline-offset: 3px;
            transition: color 0.15s ease;
          }

          body:not(:has(.site-wrap)) a:hover {
            color: #A76D99;
          }

          body:not(:has(.site-wrap)) blockquote {
            margin: 20px 0;
            padding: 12px 20px;
            border-left: 3px solid #6F4C7A;
            background: #F3EEF5;
            border-radius: 0 8px 8px 0;
            color: #555555;
            font-style: italic;
          }

          body:not(:has(.site-wrap)) code,
          body:not(:has(.site-wrap)) pre {
            font-family: ui-monospace, "SF Mono", Menlo, monospace;
            background: #EEEEEE;
            border-radius: 6px;
            font-size: 0.9em;
          }

          body:not(:has(.site-wrap)) code {
            padding: 2px 6px;
          }

          body:not(:has(.site-wrap)) pre {
            padding: 16px;
            overflow-x: auto;
            line-height: 1.5;
          }

          body:not(:has(.site-wrap)) ul,
          body:not(:has(.site-wrap)) ol {
            padding-left: 24px;
            margin: 0 0 18px;
            color: #333333;
          }

          body:not(:has(.site-wrap)) li {
            margin-bottom: 6px;
          }
        </style>
      </head>
      <body>
        ${html}
        <script>
          document.addEventListener('click', function(e) {
            var target = e.target;
            while (target && target.tagName !== 'A') {
              target = target.parentElement;
            }
            if (!target) return;
            var href = target.getAttribute('href');
            if (!href) return;
            if (href.startsWith('#')) return; // Native anchor scroll
            e.preventDefault();
            window.parent.postMessage({ type: 'NAVIGATE', address: href }, '*');
          });
        </script>
      </body>
    </html>
  `;

    return (
        <iframe
            key={title}
            ref={iframeRef}
            srcDoc={augmentedHtml}
            title={title}
            sandbox="allow-scripts"
            className="page-renderer"
        />
    );
}
