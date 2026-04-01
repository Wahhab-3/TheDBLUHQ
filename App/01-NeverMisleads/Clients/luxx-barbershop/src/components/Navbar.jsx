import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { config } from '../config';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isEvents = location.pathname === '/events';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Handle scrolling to a section — works from any page
    const scrollTo = (id) => (e) => {
        e.preventDefault();
        setMenuOpen(false);
        if (location.pathname !== '/') {
            // Navigate home first, then scroll after mount
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <div className="container navbar-inner">
                    <Link to="/" className="navbar-logo">
                        <img
                            src="/Luxx Main Logo.png"
                            alt="Luxx Barbershop & Lounge"
                            className="navbar-logo-img"
                        />
                    </Link>

                    <ul className="navbar-links">
                        <li><a href="#services" onClick={scrollTo('services')}>Services</a></li>
                        <li><a href="#vip" onClick={scrollTo('vip')}>VIP Packages</a></li>
                        <li>
                            <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>
                                Portfolio
                            </Link>
                        </li>
                        <li>
                            <Link to="/events" className={isEvents ? 'active' : ''}>
                                The Lounge
                            </Link>
                        </li>
                        <li><a href="#contact" onClick={scrollTo('contact')}>Contact</a></li>
                    </ul>

                    <div className="navbar-right">
                        <a href={config.booksy} target="_blank" rel="noopener noreferrer" className="btn-gold">
                            Book Now
                        </a>
                        <button
                            className="hamburger"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
                <a href="#services" onClick={scrollTo('services')}>Services</a>
                <a href="#vip" onClick={scrollTo('vip')}>VIP Packages</a>
                <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
                <Link to="/events" onClick={() => setMenuOpen(false)}>The Lounge</Link>
                <a href="#contact" onClick={scrollTo('contact')}>Contact</a>
                <a
                    href={config.booksy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                    onClick={() => setMenuOpen(false)}
                >
                    Book Now
                </a>
            </div>
        </>
    );
}
