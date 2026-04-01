import { siteConfig } from '../config';
import { Logo } from './Logo';

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
                <Logo />
                <nav className="hidden md:flex items-center gap-10">
                    {siteConfig.navigation.map((nav, i) => (
                        <a key={i} className="text-sm font-medium hover:text-primary transition-colors" href={nav.href}>
                            {nav.label}
                        </a>
                    ))}
                    <a href="#contact" className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    );
}
