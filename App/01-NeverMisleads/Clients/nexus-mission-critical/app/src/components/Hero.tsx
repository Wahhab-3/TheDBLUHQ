import { siteConfig } from '../config';

export function Hero() {
    const { hero } = siteConfig;

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 hero-gradient z-10"></div>
                <img alt="Hero background" className="w-full h-full object-cover" src={hero.backgroundImage} />
            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-3xl">
                    <div className="reveal-on-scroll inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">{hero.badge}</span>
                    </div>
                    <h1 className="reveal-on-scroll delay-100 text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-slate-100 mb-8">
                        {hero.headlinePart1} <br /><span className="text-primary">{hero.headlineHighlight}</span> {hero.headlinePart2}
                    </h1>
                    <p className="reveal-on-scroll delay-200 text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                        {hero.description}
                    </p>
                    <div className="reveal-on-scroll delay-300 flex flex-wrap gap-4">
                        <a href={hero.primaryCta.href} className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-lg text-base font-bold transition-all flex items-center gap-2 group shadow-xl shadow-primary/25 cursor-pointer">
                            {hero.primaryCta.label}
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                        <a href={hero.secondaryCta.href} className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 border border-slate-700 px-8 py-4 rounded-lg text-base font-bold transition-all cursor-pointer">
                            {hero.secondaryCta.label}
                        </a>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-20">
                <span className="material-symbols-outlined text-3xl">expand_more</span>
            </div>
        </section>
    );
}
