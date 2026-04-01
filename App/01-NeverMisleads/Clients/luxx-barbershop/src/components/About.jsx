export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-image reveal">
                        <img
                            className="about-image-main"
                            src="/portfolio/IMG_9140.jpeg"
                            alt="Luxx Barbershop interior with services menu"
                        />
                        <div className="about-image-badge reveal delay-2">
                            <strong>5★</strong>
                            <span>Google Rating</span>
                        </div>
                    </div>

                    <div className="about-content reveal delay-1">
                        <p className="section-label">About Luxx</p>
                        <h2 className="section-title">The Luxx Difference</h2>
                        <div className="gold-divider" />
                        <p>
                            Welcome to Luxx Barbershop — your ultimate destination for relaxation
                            and rejuvenation in Oviedo, FL. We&apos;re not your average barbershop.
                            Every visit is a full experience, from the moment you walk in.
                        </p>
                        <p>
                            Our VIP packages are designed to pamper you with haircuts, beard grooming,
                            hot towel treatments, mini facials with a steamer, relaxing massages, and a
                            complimentary drink of your choice. Family-friendly, diverse, and always
                            dedicated to excellence.
                        </p>

                        <div className="about-stats">
                            <div className="stat-box">
                                <strong>VIP</strong>
                                <span>Experience</span>
                            </div>
                            <div className="stat-box">
                                <strong>5★</strong>
                                <span>Rated</span>
                            </div>
                            <div className="stat-box">
                                <strong>All</strong>
                                <span>Welcome</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
