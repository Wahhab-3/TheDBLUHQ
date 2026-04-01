import { siteConfig } from '../config';

export function Services() {
    const { services } = siteConfig;

    return (
        <section id="services" className="py-24 bg-background-dark relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="reveal-on-scroll text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">{services.badge}</h2>
                        <h3 className="reveal-on-scroll delay-100 text-4xl md:text-5xl font-bold text-slate-100">{services.headline}</h3>
                    </div>
                    <p className="reveal-on-scroll delay-200 text-slate-400 max-w-xs text-sm border-l border-primary/30 pl-6">
                        {services.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.pillars.map((pillar, i) => (
                        <div key={i} className={`reveal-on-scroll delay-${(i % 3 + 1) * 100} glass-card p-8 rounded-xl group hover:border-primary/50 transition-all duration-500`}>
                            <div className="size-14 bg-primary/10 rounded-lg flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                                <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                            </div>
                            <h4 className="text-2xl font-bold text-slate-100 mb-6">{pillar.title}</h4>
                            <ul className="space-y-4">
                                {pillar.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                                        <span className="text-slate-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
