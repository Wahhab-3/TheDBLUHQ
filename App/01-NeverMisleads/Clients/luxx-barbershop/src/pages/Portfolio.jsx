import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { config } from '../config';
import useScrollReveal from '../hooks/useScrollReveal';

// ============================================================
// LOCAL PHOTOS from /public/portfolio/
// Remote CDN fallback for Instagram-exported images
// ============================================================
const CDN = 'https://img1.wsimg.com/isteam/ip/ce637368-e647-46a8-8e3d-2545682d1e7f/';

const PORTFOLIO = [
    // ---- ACTUAL PHOTOS (local files) ----
    // Haircuts & Fades
    { id: 1, url: '/portfolio/IMG_9139.jpeg', category: 'cuts', label: 'Low Fade + Beard' },
    { id: 2, url: '/portfolio/IMG_9140.jpeg', category: 'cuts', label: 'Curly Texture Fade' },
    { id: 3, url: '/portfolio/IMG_9141.jpeg', category: 'cuts', label: 'Tight Skin Fade' },
    { id: 4, url: '/portfolio/IMG_9146.jpeg', category: 'cuts', label: 'Classic Taper' },
    { id: 5, url: '/portfolio/IMG_9147.jpeg', category: 'cuts', label: 'Side-Swept Style' },
    { id: 6, url: '/portfolio/IMG_8945.jpeg', category: 'cuts', label: 'Curly Perm Fade' },
    { id: 7, url: '/portfolio/IMG_8948.jpeg', category: 'cuts', label: 'Curly Drop Fade' },
    { id: 8, url: '/portfolio/IMG_8955.jpeg', category: 'cuts', label: 'Blonde Fade + Beard' },
    { id: 9, url: '/portfolio/IMG_8956.jpeg', category: 'cuts', label: 'Platinum Fade Back' },
    { id: 10, url: '/portfolio/IMG_8957.jpeg', category: 'cuts', label: 'Blonde Side Profile' },
    { id: 11, url: '/portfolio/IMG_8944.jpeg', category: 'vip', label: 'VIP Session' },
    { id: 12, url: '/portfolio/IMG_8137.jpeg', category: 'vip', label: 'VIP Treatment' },
    { id: 13, url: '/portfolio/IMG_7866.jpeg', category: 'vip', label: 'Full Service Groom' },
    { id: 14, url: '/portfolio/IMG_7870.jpeg', category: 'vip', label: 'Premium Session' },
    { id: 15, url: '/portfolio/IMG_7871.jpeg', category: 'vip', label: 'Luxx VIP' },
    { id: 16, url: '/portfolio/IMG_7862.jpeg', category: 'vip', label: 'Premium Grooming' },
    { id: 17, url: '/portfolio/IMG_7854.jpeg', category: 'vip', label: 'The Experience' },
    { id: 18, url: '/portfolio/IMG_7025.jpeg', category: 'cuts', label: 'Work in Progress' },
    { id: 19, url: '/portfolio/IMG_7030.jpeg', category: 'cuts', label: 'Craft at Work' },
    { id: 20, url: '/portfolio/IMG_7033.jpeg', category: 'cuts', label: 'Master Artistry' },
    { id: 21, url: '/portfolio/IMG_7125.jpeg', category: 'cuts', label: 'By Charlene' },
    { id: 22, url: '/portfolio/IMG_6607.jpeg', category: 'cuts', label: 'Clean Cut' },
    { id: 23, url: '/portfolio/IMG_6500.jpeg', category: 'cuts', label: 'Lined Up' },
    { id: 24, url: '/portfolio/IMG_6515.jpeg', category: 'cuts', label: 'Fresh Finish' },
    { id: 25, url: '/portfolio/IMG_6221.jpeg', category: 'cuts', label: 'Styled Up' },
    { id: 26, url: '/portfolio/IMG_6189.jpeg', category: 'cuts', label: 'Sharp Detail' },
    { id: 27, url: '/portfolio/IMG_6191.jpeg', category: 'cuts', label: 'Crisp Lines' },
    { id: 28, url: '/portfolio/IMG_6112.jpeg', category: 'cuts', label: 'The Look' },
    { id: 29, url: '/portfolio/IMG_6114.jpeg', category: 'cuts', label: 'Luxx Standard' },
    { id: 30, url: '/portfolio/IMG_5922.jpeg', category: 'cuts', label: 'Signature Style' },
    // Kids Cuts
    { id: 31, url: '/portfolio/3D71D099-3B04-4CCE-9415-CEDCC170AF1C.jpeg', category: 'shop', label: 'Kids Cut — Happy Client' },
    { id: 32, url: '/portfolio/70A53769-92E7-44B0-8909-68697C28739A.jpeg', category: 'shop', label: 'Kids Cut — Profile' },
    // Facebook / event shot
    { id: 33, url: '/portfolio/fb_122115294482758768_1440x1800.jpg', category: 'vip', label: 'Event Grooming' },
    // Instagram-exported portfolio (CDN hosted)
    { id: 34, url: CDN + 'ig_18039534959624062.jpg', category: 'cuts', label: 'Fresh Cut' },
    { id: 35, url: CDN + 'ig_18042020816370596.jpg', category: 'cuts', label: 'Clean Style' },
    { id: 36, url: CDN + 'ig_18043650749587524.jpg', category: 'cuts', label: 'Fade' },
    { id: 37, url: CDN + 'ig_18058242062086814.jpg', category: 'cuts', label: 'Textured Cut' },
    { id: 38, url: CDN + 'ig_18068410681674296.jpg', category: 'cuts', label: 'Shape Up' },
    { id: 39, url: CDN + 'ig_18069475786776343.jpg', category: 'cuts', label: 'Luxx Cut' },
    { id: 40, url: CDN + 'ig_18078014473582934.jpg', category: 'cuts', label: 'Clean Fade' },
    { id: 41, url: CDN + 'ig_17842585821384036.jpg', category: 'cuts', label: 'Styled' },
    { id: 42, url: CDN + 'ig_17859129585230794.jpg', category: 'cuts', label: 'Precision Cut' },
    { id: 43, url: CDN + 'ig_17881958187212713.jpg', category: 'cuts', label: 'Skin Fade' },
    { id: 44, url: CDN + 'ig_17918592914985778.jpg', category: 'cuts', label: 'Low Fade' },
    { id: 45, url: CDN + 'ig_17927120949008356.jpg', category: 'cuts', label: 'High Fade' },
    { id: 46, url: CDN + 'ig_17942308859776582.jpg', category: 'cuts', label: 'Taper' },
    { id: 47, url: CDN + 'ig_17976700208653682.jpg', category: 'cuts', label: 'Fresh Style' },
    { id: 48, url: CDN + 'ig_17983179155769587.jpg', category: 'cuts', label: 'Luxx Finish' },
    { id: 49, url: CDN + 'ig_18029732804338302.jpg', category: 'cuts', label: 'Edge Up' },
    { id: 50, url: CDN + 'ig_18036941723195309.jpg', category: 'cuts', label: 'Detail Work' },
];

const FILTERS = [
    { key: 'all', label: 'All Work' },
    { key: 'cuts', label: 'Cuts & Fades' },
    { key: 'vip', label: 'VIP Sessions' },
    { key: 'shop', label: 'The Shop' },
];

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    // Re-trigger scroll reveal whenever active filter changes to animate filtered list
    useScrollReveal([activeFilter]);

    const filtered = activeFilter === 'all'
        ? PORTFOLIO
        : PORTFOLIO.filter(p => p.category === activeFilter);

    return (
        <>
            <Navbar />

            {/* Hero */}
            <section style={{
                minHeight: '50vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '100px',
                background: 'linear-gradient(to bottom, var(--green) 0%, var(--bg) 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.04,
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E\")",
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingBottom: '48px' }}>
                    <p className="section-label reveal">By Charlene</p>
                    <h1 className="reveal delay-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.05 }}>
                        Our <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Work</em>
                    </h1>
                    <p className="reveal delay-2" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 12px' }}>
                        Every cut tells a story. {PORTFOLIO.length}+ photos from real Luxx clients.
                    </p>
                    <a href={config.booksy} target="_blank" rel="noopener noreferrer" className="btn-gold reveal delay-3" style={{ marginTop: '24px', display: 'inline-flex' }}>
                        Book with Charlene →
                    </a>
                </div>
            </section>

            {/* Filter Tabs */}
            <section style={{ paddingTop: '64px', paddingBottom: '0', background: 'var(--bg-alt)' }}>
                <div className="container">
                    <div className="reveal fade-scale" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
                        {FILTERS.map(f => (
                            <button
                                key={f.key}
                                onClick={() => setActiveFilter(f.key)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '99px',
                                    border: activeFilter === f.key ? '2px solid var(--gold)' : '2px solid var(--border-green)',
                                    background: activeFilter === f.key ? 'var(--gold)' : 'transparent',
                                    color: activeFilter === f.key ? '#0C0C0C' : 'var(--text-muted)',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {f.label}
                                <span style={{ marginLeft: '6px', fontSize: '0.7rem', opacity: 0.7 }}>
                                    ({f.key === 'all' ? PORTFOLIO.length : PORTFOLIO.filter(p => p.category === f.key).length})
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Masonry Grid */}
                    <div style={{ columns: '3 260px', gap: '10px', paddingBottom: '96px' }}>
                        {filtered.map((photo) => (
                            <PortfolioItem key={photo.id} photo={photo} onClick={() => setLightbox(photo)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Strip */}
            <section style={{ background: 'var(--green)', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <p className="section-label" style={{ marginBottom: '16px' }}>Like what you see?</p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)', marginBottom: '24px' }}>
                        Ready for Your <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Luxx Moment?</span>
                    </h2>
                    <a href={config.booksy} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: '1rem', padding: '16px 40px' }}>
                        Book with Charlene →
                    </a>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div
                    onClick={() => setLightbox(null)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.95)',
                        zIndex: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                        cursor: 'zoom-out',
                    }}
                >
                    <div style={{ position: 'relative', maxWidth: '860px', width: '100%' }} onClick={e => e.stopPropagation()}>
                        <img
                            src={lightbox.url}
                            alt={lightbox.label}
                            style={{ width: '100%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', maxHeight: '85vh', objectFit: 'contain' }}
                        />
                        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{lightbox.label}</span>
                            <button
                                onClick={() => setLightbox(null)}
                                style={{ background: 'var(--gold)', color: '#0C0C0C', border: 'none', borderRadius: 'var(--radius)', padding: '8px 20px', fontWeight: 700, cursor: 'pointer' }}
                            >
                                Close ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="back-to-barber">
                <Link to="/">← Back to Luxx Barbershop</Link>
            </div>

            <Footer />
        </>
    );
}

// Extracted for clean hover handling
function PortfolioItem({ photo, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="reveal fade-scale"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                breakInside: 'avoid',
                marginBottom: '10px',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: `1px solid ${hovered ? 'var(--gold)' : 'var(--border-green)'}`,
                transform: hovered ? 'scale(1.015)' : 'scale(1)',
                transition: 'all 0.3s ease',
            }}
        >
            <img
                src={photo.url}
                alt={photo.label}
                style={{ width: '100%', display: 'block' }}
                loading="lazy"
                onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            />
            {/* Hover overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(12,12,12,0.85) 0%, transparent 60%)',
                display: 'flex', alignItems: 'flex-end',
                padding: '16px',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}>
                <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>{photo.label}</span>
            </div>
        </div>
    );
}
