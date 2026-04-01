import { config } from '../config';

export default function Reviews() {
    return (
        <section id="reviews">
            <div className="container">
                <div className="section-header centered reveal">
                    <p className="section-label">What They&apos;re Saying</p>
                    <h2 className="section-title">Real Reviews from Booksy</h2>
                    <div className="gold-divider centered" />
                </div>

                <div className="reviews-grid">
                    {config.reviews.map((r, i) => (
                        <div className={`review-card reveal delay-${Math.min((i % 3) + 1, 3)}`} key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div className="review-stars">{'★'.repeat(r.rating)}</div>
                                {r.date && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{r.date}</span>
                                )}
                            </div>
                            <p className="review-text">&ldquo;{r.text}&rdquo;</p>
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', marginTop: 'auto' }}>
                                <div className="review-author">{r.name}</div>
                                {r.service && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                                        ✓ Verified: {r.service}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Booksy link */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <a
                        href={config.booksy}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.25s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    >
                        See all reviews on Booksy →
                    </a>
                </div>
            </div>
        </section>
    );
}
