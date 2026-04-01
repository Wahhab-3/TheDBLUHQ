import { config } from '../config';

export default function VIPPackages() {
    return (
        <section className="vip" id="vip">
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-header centered reveal">
                    <p className="section-label">Luxury Grooming</p>
                    <h2 className="section-title" style={{ color: 'var(--gold)' }}>VIP Packages</h2>
                    <div className="gold-divider centered" />
                    <p style={{ color: 'rgba(245,239,224,0.6)', maxWidth: '480px', margin: '8px auto 0' }}>
                        The full Luxx experience. Every package includes premium grooming and complimentary drinks.
                    </p>
                </div>

                <div className="vip-grid">
                    {config.vipPackages.map((pkg, i) => (
                        <div key={i} className={`vip-card reveal delay-${(i % 4) + 1} ${pkg.popular ? ' popular' : ''}`}>
                            {pkg.popular && <span className="popular-badge">Most Popular</span>}
                            <h3>{pkg.name}</h3>
                            <p>{pkg.description}</p>
                            <div className="vip-card-footer">
                                <div>
                                    <div className="vip-price">{pkg.price}</div>
                                    <div className="vip-duration">{pkg.duration}</div>
                                </div>
                                <a
                                    href={pkg.booksy}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gold"
                                    style={{ padding: '10px 20px', fontSize: '0.82rem' }}
                                >
                                    Book This
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
