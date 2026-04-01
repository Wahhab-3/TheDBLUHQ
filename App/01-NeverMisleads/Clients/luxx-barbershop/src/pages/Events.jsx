import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { config } from '../config';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Events() {
    useScrollReveal();

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', eventType: 'Groomsmen Package',
        date: '', groupSize: '', message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production: wire this to EmailJS, Formspree, or backend
        setSubmitted(true);
    };

    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="events-hero">
                <div className="events-hero-bg" />
                <div className="container">
                    <div className="events-hero-inner">
                        <div className="hero-badge reveal delay-1" style={{ background: 'rgba(123,34,53,0.4)', borderColor: 'rgba(201,168,76,0.3)' }}>
                            ✦ Private Event Space — Oviedo, FL
                        </div>
                        <h1 className="reveal delay-2">
                            <span className="subtitle">Welcome to</span>
                            The Luxx<br />Lounge
                        </h1>
                        <p className="reveal delay-3">
                            Private events, groomsmen packages, game nights & more.
                            Oviedo&apos;s premier man cave experience — where every
                            gathering becomes legendary.
                        </p>
                        <div className="hero-buttons reveal delay-4">
                            <a href="#inquiry" className="btn-gold">Inquire Today →</a>
                            <a href="#packages" className="btn-outline">View Packages</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Types */}
            <section className="event-types" id="packages">
                <div className="container">
                    <div className="section-header centered reveal">
                        <p className="section-label">What We Host</p>
                        <h2 className="section-title">Event Packages</h2>
                        <div className="gold-divider centered" />
                    </div>

                    <div className="event-types-grid">
                        {config.eventTypes.map((evt, i) => (
                            <div key={i} className={`event-type-card reveal delay-${Math.min((i % 4) + 1, 4)}`}>
                                <span className="event-type-icon">{evt.icon}</span>
                                <h3>{evt.title}</h3>
                                <p>{evt.description}</p>
                                <ul className="event-features">
                                    {evt.features.map((feat, j) => (
                                        <li key={j}>{feat}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section className="inquiry" id="inquiry">
                <div className="container">
                    <div className="inquiry-inner">
                        <div className="section-header centered reveal">
                            <p className="section-label">Let&apos;s Plan Your Event</p>
                            <h2 className="section-title" style={{ color: 'var(--gold)' }}>Inquire About the Lounge</h2>
                            <div className="gold-divider centered" />
                            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                                Share your event details and we&apos;ll get back to you within 24 hours.
                            </p>
                        </div>

                        {submitted ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '64px 32px',
                                background: 'var(--bg-card)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border)',
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🥂</div>
                                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '12px' }}>
                                    We Got Your Inquiry!
                                </h3>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    We&apos;ll reach out within 24 hours to discuss your event details.
                                </p>
                            </div>
                        ) : (
                            <form className="inquiry-form reveal delay-2" onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" name="name" type="text" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input id="email" name="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input id="phone" name="phone" type="tel" placeholder="(407) 000-0000" value={formData.phone} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="eventType">Event Type</label>
                                        <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange}>
                                            <option>Groomsmen Package</option>
                                            <option>Birthday Celebration</option>
                                            <option>Game Night</option>
                                            <option>Private Corporate Event</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Preferred Date</label>
                                        <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="groupSize">Group Size</label>
                                        <input id="groupSize" name="groupSize" type="text" placeholder="e.g. 8 people" value={formData.groupSize} onChange={handleChange} />
                                    </div>
                                    <div className="form-group full">
                                        <label htmlFor="message">Message & Special Requests</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your vision, any special needs, questions..."
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-submit">
                                    <button type="submit" className="btn-gold">
                                        Send Inquiry
                                    </button>
                                    <p className="form-note">
                                        By submitting, you agree to be contacted regarding your event request.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Back to Barber */}
            <div className="back-to-barber">
                <Link to="/">← Back to Luxx Barbershop</Link>
            </div>

            <Footer />
        </>
    );
}
