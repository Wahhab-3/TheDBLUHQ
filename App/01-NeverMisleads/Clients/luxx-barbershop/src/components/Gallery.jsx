const GALLERY_IMAGES = [
    { url: '/portfolio/IMG_8955.jpeg', alt: 'Client with beard & blonde fade at Luxx' },
    { url: '/portfolio/IMG_9139.jpeg', alt: 'Curly fade with textured top' },
    { url: '/portfolio/IMG_9147.jpeg', alt: 'Clean side-swept style' },
    { url: '/portfolio/IMG_9141.jpeg', alt: 'Tight skin fade from the back' },
    { url: '/portfolio/3D71D099-3B04-4CCE-9415-CEDCC170AF1C.jpeg', alt: 'Young client fresh cut smiling' },
    { url: '/portfolio/IMG_8948.jpeg', alt: 'Curly perm fade — shop interior' },
];

export default function Gallery() {
    return (
        <section style={{ background: 'var(--bg-alt)' }} id="gallery">
            <div className="container">
                <div className="section-header centered reveal">
                    <p className="section-label">The Luxx Vibe</p>
                    <h2 className="section-title">Gallery</h2>
                    <div className="gold-divider centered" />
                </div>

                <div className="gallery-grid">
                    {GALLERY_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className={`gallery-item reveal fade-scale delay-${Math.min((i % 4) + 1, 4)}`}
                            style={{ backgroundImage: `url(${img.url})` }}
                            role="img"
                            aria-label={img.alt}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
