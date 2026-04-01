import { siteConfig } from '../config';

export function Advantage() {
    const { advantage } = siteConfig;

    return (
        <section id="advantage" className="py-24 bg-background-dark/50 relative border-t border-primary/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,185,242,0.03)_0%,transparent_100%)] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="reveal-on-scroll inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">{advantage.badge}</span>
                    </div>
                    <h2 className="reveal-on-scroll delay-100 text-4xl md:text-5xl font-bold text-slate-100 mb-6">{advantage.headline}</h2>
                    <p className="reveal-on-scroll delay-200 text-lg text-slate-400">
                        {advantage.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advantage.cards.map((card, i) => (
                        <div key={i} className={`reveal-on-scroll delay-${(i % 4 + 1) * 100} bg-accent-dark/40 border border-slate-800 p-8 rounded-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden`}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="size-12 bg-background-dark border border-slate-700 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                                <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 mb-3">{card.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
