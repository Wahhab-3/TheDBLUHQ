import { config } from '../config';

export default function Services() {
    return (
        <section id="services">
            <div className="container">
                <div className="section-header reveal">
                    <p className="section-label">What We Offer</p>
                    <h2 className="section-title">Our Services</h2>
                    <div className="gold-divider" />
                    <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginTop: '8px' }}>
                        Every service is performed with precision and care. Book directly on Booksy for instant scheduling.
                    </p>
                </div>

                <div className="services-grid">
                    {config.services.map((svc, i) => (
                        <div className={`service-card reveal delay-${Math.min((i % 4) + 1, 4)}`} key={i}>
                            <div className="service-info">
                                <div className="service-name">{svc.name}</div>
                                <div className="service-meta">
                                    <span>{svc.duration}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                                <div className="service-price">{svc.price}</div>
                                <a
                                    href={svc.booksy}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-green"
                                >
                                    Book
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
