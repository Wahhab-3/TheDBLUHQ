export function Logo({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {/* Recreated Logo SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="currentColor" className="w-[56px] h-[56px] flex-shrink-0 text-slate-100">
                {/* Base line */}
                <rect x="10" y="88" width="100" height="4" />

                {/* Left Building Body */}
                <polygon points="30,82 30,42 50,50 50,82" />
                {/* Right Building Body */}
                <polygon points="56,82 56,26 86,38 86,82" />

                {/* Left Roof */}
                <polygon points="26,34 56,46 56,38 26,26" />
                {/* Right Roof */}
                <polygon points="52,18 92,34 92,26 52,10" />

                {/* Windows Left */}
                <rect x="36" y="55" width="8" height="3" className="fill-background-dark" />
                <rect x="36" y="62" width="8" height="3" className="fill-background-dark" />
                <rect x="36" y="69" width="8" height="3" className="fill-background-dark" />
                <rect x="36" y="76" width="8" height="3" className="fill-background-dark" />

                {/* Windows Right Column 1 */}
                <rect x="62" y="42" width="8" height="3" className="fill-background-dark" />
                <rect x="62" y="49" width="8" height="3" className="fill-background-dark" />
                <rect x="62" y="56" width="8" height="3" className="fill-background-dark" />
                <rect x="62" y="63" width="8" height="3" className="fill-background-dark" />
                <rect x="62" y="70" width="8" height="3" className="fill-background-dark" />
                <rect x="62" y="77" width="8" height="3" className="fill-background-dark" />

                {/* Windows Right Column 2 */}
                <rect x="74" y="47" width="8" height="3" className="fill-background-dark" />
                <rect x="74" y="54" width="8" height="3" className="fill-background-dark" />
                <rect x="74" y="61" width="8" height="3" className="fill-background-dark" />
                <rect x="74" y="68" width="8" height="3" className="fill-background-dark" />
                <rect x="74" y="75" width="8" height="3" className="fill-background-dark" />
            </svg>

            <div className="flex flex-col justify-center">
                <span className="text-4xl md:text-5xl font-black italic tracking-[-0.05em] leading-[0.85] text-slate-100 uppercase" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    NEXUS
                </span>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase leading-tight text-slate-100 mt-1">
                    Mission Critical Solutions
                </span>
            </div>
        </div>
    );
}
