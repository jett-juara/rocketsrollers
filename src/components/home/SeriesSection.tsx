export default function SeriesSection() {
    const cards = [
        { title: "SYDNEY", date: "February 14 - 15 2026", location: "Ken Rosewall Arena", type: "tickets", isBadge: true },
        { title: "West Coast", date: "April", location: "West Coast, USA", type: "soon" },
        { title: "East Coast", date: "May", location: "East Coast, USA", type: "soon" },
        { title: "Brazil", date: "August", location: "Brazil", type: "soon" },
        { title: "France", date: "October", location: "France", type: "soon", centered: true },
        { title: "Japan", date: "November", location: "Japan", type: "soon", centered: true },
        { title: "Brazil", date: "December", location: "Brazil", type: "soon", centered: true },
    ];

    const BadgeIcon = () => (
        <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-none stroke-current stroke-[0.5]">
            <circle cx="100" cy="100" r="95" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="85" className="stroke-2" />
            <circle cx="100" cy="100" r="75" strokeDasharray="1 1" />
        </svg>
    );

    const ShieldIcon = () => (
        <svg viewBox="0 0 100 120" className="w-full h-full fill-none stroke-white stroke-2">
            <path d="M10,5 L90,5 L90,85 C90,105 50,115 50,115 C50,115 10,105 10,85 L10,5 Z" />
            <text x="50" y="45" textAnchor="middle" className="fill-white font-heading font-bold text-[35px]">SLS</text>
            <g transform="translate(30, 60) scale(0.6)">
                <rect x="0" y="20" width="60" height="8" rx="4" fill="white" transform="rotate(-30 30 24)" />
                <circle cx="15" cy="35" r="5" fill="white" />
                <circle cx="45" cy="18" r="5" fill="white" />
            </g>
        </svg>
    );

    return (
        <section id="series" className="bg-black py-24 border-b border-white/10">
            <div className="max-w-[1366px] mx-auto px-6">
                <h2 className="font-heading text-white text-[50px] uppercase tracking-tighter leading-none mb-16 text-center">
                    Series
                </h2>

                {/* Top Row: 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {cards.slice(0, 4).map((card, idx) => (
                        <div key={idx} className="group border border-white/20 bg-black overflow-hidden flex flex-col transition-all duration-300 hover:border-white/40">
                            <div className="p-8 flex flex-col items-center text-center flex-grow">
                                <div className={`relative ${card.isBadge ? 'w-48 h-48' : 'w-40 h-48'} mb-6 flex items-center justify-center`}>
                                    {card.isBadge ? <BadgeIcon /> : <ShieldIcon />}
                                    {card.isBadge && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-[14px] font-bold tracking-[0.4em] mb-1">{card.title}</span>
                                            <span className="text-[9px] opacity-40 mb-2">— 2026 —</span>
                                            <div className="border-2 border-white px-3 py-1 mb-2">
                                                <span className="text-3xl font-heading font-bold tracking-tighter leading-none">SLS</span>
                                            </div>
                                            <span className="text-[7px] font-bold tracking-[0.3em] opacity-60">CHAMPIONSHIP TOUR</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-auto">
                                    <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{card.date}</h3>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{card.location}</p>
                                </div>
                            </div>
                            {card.type === 'tickets' ? (
                                <a href="#" className="block w-full bg-white text-black text-center py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                                    Buy Tickets
                                </a>
                            ) : (
                                <div className="w-full bg-white text-black text-center py-4 font-heading font-bold uppercase tracking-widest text-sm cursor-default">
                                    Coming Soon
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Row 2: 3 Cards Centered */}
                <div className="flex flex-wrap justify-center gap-6">
                    {cards.slice(4).map((card, idx) => (
                        <div key={idx} className="group border border-white/20 bg-black overflow-hidden flex flex-col transition-all duration-300 hover:border-white/40 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                            <div className="p-8 flex flex-col items-center text-center flex-grow">
                                <div className="w-40 h-48 mb-8 flex items-center justify-center">
                                    <ShieldIcon />
                                </div>
                                <div className="mt-auto">
                                    <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{card.date}</h3>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{card.location}</p>
                                </div>
                            </div>
                            <div className="w-full bg-white text-black text-center py-4 font-heading font-bold uppercase tracking-widest text-sm cursor-default">
                                Coming Soon
                            </div>
                        </div>
                    ))}
                </div>

                {/* Technical Handbook CTA */}
                <div className="mt-20 border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-zinc-900/30 p-8 rounded-2xl">
                    <div className="max-w-xl">
                        <h3 className="text-2xl font-slab font-bold uppercase mb-2">Technical Handbook</h3>
                        <p className="text-gray-400 font-body text-sm">
                            Unduh panduan teknis, regulasi perlombaan, dan informasi kategori umur untuk RocketsRollers Competition Series #2 2025.
                        </p>
                    </div>
                    <a
                        href="/docs/handbook-series-2.pdf"
                        target="_blank"
                        className="bg-brand-blue text-white px-8 py-4 font-heading font-bold uppercase tracking-widest rounded-lg hover:bg-blue-600 transition-all flex items-center gap-3 whitespace-nowrap shadow-[0_0_20px_rgba(17,109,255,0.3)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                    </a>
                </div>
            </div>
        </section>
    );
}
