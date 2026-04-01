import { config } from '../config';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="reveal delay-1">
                        <div className="footer-brand-name">LUXX</div>
                        <p className="footer-brand-tagline">
                            Oviedo&apos;s premier barbershop and luxury event space.
                            Walk in fresh, walk out legendary.
                        </p>
                        <div className="footer-contact-item">
                            <span>📍</span>
                            <span>{config.address}</span>
                        </div>
                        <div className="footer-contact-item">
                            <span>📞</span>
                            <a href={`tel:${config.phone}`}>{config.phone}</a>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                            <a
                                href={config.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.25s' }}
                                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                            >
                                Instagram
                            </a>
                            <a
                                href={config.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.25s' }}
                                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                            >
                                Facebook
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column reveal delay-2">
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#vip">VIP Packages</a></li>
                            <li><a href="#gallery">Gallery</a></li>
                            <li><Link to="/events">The Lounge</Link></li>
                            <li>
                                <a href={config.booksy} target="_blank" rel="noopener noreferrer">
                                    Book on Booksy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="footer-column reveal delay-3">
                        <h4>Hours</h4>
                        <ul className="footer-hours">
                            {config.hours.map((h, i) => (
                                <li key={i} style={{ marginBottom: '8px' }}>
                                    <strong>{h.day}</strong>
                                    {h.time}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Luxx Barbershop. All rights reserved.</span>
                    <span>
                        Built by{' '}
                        <span style={{ color: 'var(--gold)' }}>Never MisLeads</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
