import { config } from '../config';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero-bg" />
            <div className="container">
                <div className="hero-content">
                    <div className="hero-logo-wrap reveal delay-1">
                        <img
                            src="/Luxx Main Logo.png"
                            alt="Luxx Barbershop & Lounge"
                            className="hero-logo"
                        />
                    </div>
                    <div className="hero-badge reveal delay-2">
                        ✦ Oviedo, Florida
                    </div>
                    <h1 className="reveal delay-3">
                        It&apos;s Not Just<br />
                        a Haircut, It&apos;s<br />
                        <em>an Experience</em>
                    </h1>
                    <p className="reveal delay-4">{config.subtagline}</p>
                    <div className="hero-buttons reveal delay-4">
                        <a
                            href={config.booksy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold"
                        >
                            Book Your Appointment →
                        </a>
                        <a href="#services" className="btn-outline">
                            View Services
                        </a>
                    </div>
                </div>
            </div>
            <div className="hero-scroll">Scroll</div>
        </section>
    );
}
