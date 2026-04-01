import { siteConfig } from '../config';

export function Contact() {
    const { contact } = siteConfig;

    return (
        <section id="contact" className="py-24 bg-background-dark overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="reveal-on-scroll text-4xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">
                            {contact.headlineStart} <span className="text-primary italic">{contact.headlineHighlight}</span>
                        </h2>
                        <p className="reveal-on-scroll delay-100 text-slate-400 text-lg mb-10 leading-relaxed">
                            {contact.description}
                        </p>
                        <div className="space-y-6">
                            {contact.bullets.map((bullet, i) => (
                                <div key={i} className={`reveal-on-scroll delay-${(i % 3 + 2) * 100} flex items-start gap-4`}>
                                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">{bullet.icon}</span>
                                    <div>
                                        <h5 className="text-slate-100 font-bold">{bullet.title}</h5>
                                        <p className="text-slate-500 text-sm">{bullet.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="reveal-on-scroll delay-300 bg-accent-dark/50 border border-slate-800 p-10 rounded-2xl shadow-2xl">
                        <form action="#" className="space-y-6" onSubmit={e => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                                    <input className="w-full bg-background-dark border border-slate-700 rounded-lg p-3 focus:border-primary focus:ring-1 focus:outline-none focus:ring-primary text-slate-100 placeholder:text-slate-600" placeholder="John Doe" type="text" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company</label>
                                    <input className="w-full bg-background-dark border border-slate-700 rounded-lg p-3 focus:border-primary focus:ring-1 focus:outline-none focus:ring-primary text-slate-100 placeholder:text-slate-600" placeholder="Tech Global Inc." type="text" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                                <input className="w-full bg-background-dark border border-slate-700 rounded-lg p-3 focus:border-primary focus:ring-1 focus:outline-none focus:ring-primary text-slate-100 placeholder:text-slate-600" placeholder="john@company.com" type="email" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Details</label>
                                <textarea className="w-full bg-background-dark border border-slate-700 rounded-lg p-3 focus:border-primary focus:ring-1 focus:outline-none focus:ring-primary text-slate-100 placeholder:text-slate-600" placeholder="Tell us about your mission critical needs..." rows={4} required></textarea>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary/90 text-background-dark py-4 rounded-lg font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20" type="submit">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
