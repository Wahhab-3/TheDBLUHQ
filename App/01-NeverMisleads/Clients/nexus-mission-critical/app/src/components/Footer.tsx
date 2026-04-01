import { siteConfig } from '../config';
import { Logo } from './Logo';

export function Footer() {
    const { footer, brand } = siteConfig;

    return (
        <footer className="bg-background-dark border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-4">
                        <Logo className="scale-75 origin-left" />
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{brand.name} {brand.subName} © {brand.year}</span>
                    </div>
                    <div className="flex gap-8 text-slate-500 text-sm">
                        {footer.links.map((link, i) => (
                            <a key={i} className="hover:text-primary transition-colors" href={link.href}>{link.label}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
