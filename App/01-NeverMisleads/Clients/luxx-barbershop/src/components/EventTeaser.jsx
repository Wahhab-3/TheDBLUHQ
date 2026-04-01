import { Link } from 'react-router-dom';

export default function EventTeaser() {
    return (
        <section className="event-teaser">
            <div className="container">
                <div className="event-teaser-inner">
                    <div className="reveal delay-1">
                        <p className="section-label" style={{ color: 'rgba(201,168,76,0.8)' }}>More Than a Cut</p>
                        <h2>
                            Introducing<br />
                            <span>The Luxx Lounge</span>
                        </h2>
                        <p>
                            Luxx is evolving. Beyond premium grooming, we&apos;re building
                            Oviedo&apos;s ultimate man cave — a private event space for groomsmen
                            packages, birthday celebrations, game nights, and more.
                        </p>
                        <ul className="event-teaser-features">
                            <li>🥂 Groomsmen Packages</li>
                            <li>🎂 Birthday Celebrations</li>
                            <li>🎮 Game Nights & Sports Viewing</li>
                            <li>🎉 Private Events & Corporate Gatherings</li>
                        </ul>
                        <Link to="/events" className="btn-gold">
                            Explore The Lounge →
                        </Link>
                    </div>

                    <img
                        className="event-teaser-image reveal delay-2"
                        src="/luxx-lounge-pool-table.png"
                        alt="Luxx Lounge pool table and event space"
                    />
                </div>
            </div>
        </section>
    );
}
