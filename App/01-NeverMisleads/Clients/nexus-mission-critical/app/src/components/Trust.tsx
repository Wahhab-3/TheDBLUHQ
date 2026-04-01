import { siteConfig } from '../config';

export function Trust() {
    const { trust } = siteConfig;

    return (
        <section id="markets" className="py-24 bg-accent-dark/30 border-y border-primary/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold text-slate-100 mb-4">{trust.headline}</h2>
                <p className="reveal-on-scroll delay-100 text-slate-400 mb-16 max-w-2xl mx-auto">{trust.description}</p>

                <div className="reveal-on-scroll delay-200 relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-20 bg-background-dark shadow-2xl shadow-primary/5 border border-primary/10">
                    <img alt="Map" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" src={trust.mapImage} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

                    {/* Mock Map Nodes */}
                    <div className="absolute top-[40%] left-[20%] size-3 bg-primary rounded-full shadow-[0_0_15px_rgba(13,185,242,0.8)]"></div>
                    <div className="absolute top-[60%] left-[45%] size-3 bg-primary rounded-full shadow-[0_0_15px_rgba(13,185,242,0.8)]"></div>
                    <div className="absolute top-[35%] left-[85%] size-4 bg-primary rounded-full shadow-[0_0_20px_rgba(13,185,242,1)] animate-pulse"></div>
                    <div className="absolute top-[75%] left-[75%] size-3 bg-primary rounded-full shadow-[0_0_15px_rgba(13,185,242,0.8)]"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700 mb-20">
                    {trust.logos.map((logo, i) => (
                        <img key={i} alt="Client Logo" className={`reveal-on-scroll delay-${(i % 5 + 1) * 100} h-8 mx-auto`} src={logo} />
                    ))}
                </div>

                {/* Markets Array */}
                <div className="border-t border-slate-800 pt-16">
                    <h3 className="reveal-on-scroll text-sm font-bold uppercase tracking-widest text-primary mb-8">Active Deployments</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {trust.markets.map((market, i) => (
                            <div key={i} className={`reveal-on-scroll delay-${(i % 4 + 1) * 100} bg-accent-dark/50 border border-slate-700/50 px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:border-primary/50 hover:text-white transition-colors cursor-default`}>
                                {market}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
