import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import VIPPackages from '../components/VIPPackages';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import EventTeaser from '../components/EventTeaser';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
    useScrollReveal();

    return (
        <>
            <Navbar />
            <Hero />
            <VIPPackages />
            <Services />
            <About />
            <Gallery />
            <Reviews />
            <EventTeaser />
            <Footer />
        </>
    );
}
