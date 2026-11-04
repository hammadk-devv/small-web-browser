// apps/web/src/components/PublishForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { api } from '@/lib/api';

export function PublishForm() {
    const { personId, navigate, closeOverlay } = useBrowser();
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [html, setHtml] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await api.publish({
                address: address.trim(),
                title: title.trim(),
                html,
                authorId: personId,
            });

            const publishedAddress = address.trim();
            setAddress('');
            setTitle('');
            setHtml('');
            navigate(publishedAddress);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to publish site';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="panel-container">
            <div className="panel-header">
                <div>
                    <h2>Publish a Site</h2>
                    <p className="panel-subtitle">Deploy a static page to the decentralized network</p>
                </div>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={closeOverlay}
                    aria-label="Cancel and close publish form"
                >
                    Cancel
                </button>
            </div>

            {error && (
                <div className="alert-box alert-error">
                    <p>{error}</p>
                </div>
            )}

            <form className="publish-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="publish-address">
                        Address
                    </label>
                    <input
                        id="publish-address"
                        type="text"
                        className="form-input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. portfolio.zz"
                        required
                        disabled={isSubmitting}
                    />
                    <span className="form-hint">Must end with a domain suffix (e.g., .zz)</span>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="publish-title">
                        Page Title
                    </label>
                    <input
                        id="publish-title"
                        type="text"
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. My Decentralized Blog"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="publish-html">
                        HTML Content
                    </label>
                    <textarea
                        id="publish-html"
                        className="form-textarea"
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        placeholder="<h1>Welcome</h1><p>Content for your site goes here.</p>"
                        required
                        disabled={isSubmitting}
                        rows={10}
                    />
                    <span className="form-hint">Standard sanitized HTML will be rendered in a secure sandbox.</span>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish to Network'}
                    </button>
                </div>
            </form>
        </div>
    );
}
