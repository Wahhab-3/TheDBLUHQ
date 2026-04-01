import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Advantage } from './components/Advantage';
import { Services } from './components/Services';
import { Trust } from './components/Trust';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Advantage />
        <Services />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
