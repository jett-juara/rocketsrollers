export default function AthletesSection() {
    const clubs = [
        {
            name: "Skatepark de Paris", country: "France", code: "PAR", svg: (
                <>
                    <path d="M50 10 L85 25 L85 60 C85 80 50 90 50 90 C50 90 15 80 15 60 L15 25 L50 10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="50" y="58" textAnchor="middle" fontSize="24" fontFamily="Oswald" fontWeight="bold">PAR</text>
                </>
            )
        },
        {
            name: "Sydney Skate Club", country: "Australia", code: "SYDNEY", svg: (
                <>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M35 50 L65 50 M50 35 L50 65" stroke="currentColor" strokeWidth="2" />
                    <text x="50" y="70" textAnchor="middle" fontSize="12" fontFamily="Oswald" fontWeight="bold">SYDNEY</text>
                </>
            )
        },
        {
            name: "Tokyo Street Crew", country: "Japan", code: "TKYO", svg: (
                <>
                    <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)" />
                    <text x="50" y="58" textAnchor="middle" fontSize="24" fontFamily="Oswald" fontWeight="bold">TKYO</text>
                </>
            )
        },
        {
            name: "LA Skate Co", country: "USA", code: "LA", svg: (
                <>
                    <path d="M20 80 L50 20 L80 80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="50" y="70" textAnchor="middle" fontSize="20" fontFamily="Oswald" fontWeight="bold">LA</text>
                </>
            )
        },
        {
            name: "Rio Skateboarding", country: "Brazil", code: "RIO", svg: (
                <>
                    <path d="M30 20 H70 V80 H30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M30 40 H70 M30 60 H70" stroke="currentColor" strokeWidth="1" />
                    <text x="50" y="58" textAnchor="middle" fontSize="24" fontFamily="Oswald" fontWeight="bold">RIO</text>
                </>
            )
        },
        {
            name: "London Grind", country: "UK", code: "LDN", svg: (
                <>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="50" y="58" textAnchor="middle" fontSize="24" fontFamily="Oswald" fontWeight="bold">LDN</text>
                </>
            )
        },
        {
            name: "Barcelona Lines", country: "Spain", code: "BCN", svg: (
                <>
                    <path d="M10 50 Q50 10 90 50 Q50 90 10 50" fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="50" y="58" textAnchor="middle" fontSize="24" fontFamily="Oswald" fontWeight="bold">BCN</text>
                </>
            )
        },
        {
            name: "Berlin Walls", country: "Germany", code: "BER", svg: (
                <>
                    <path d="M20 20 H80 V80 H20 Z M40 20 V80 M60 20 V80" fill="none" stroke="currentColor" strokeWidth="1" />
                    <text x="50" y="58" textAnchor="middle" fontSize="24" fontFamily="Oswald" fontWeight="bold">BER</text>
                </>
            )
        },
    ];

    const skaters = [
        { name: "Nyjah Huston", country: "USA", code: "NH" },
        { name: "Yuto Horigome", country: "Japan", code: "YH" },
        { name: "Giovanni Vianna", country: "Brazil", code: "GV" },
        { name: "Chris Joslin", country: "USA", code: "CJ" },
        { name: "Rayssa Leal", country: "Brazil", code: "RL" },
        { name: "Chloe Covell", country: "Australia", code: "CC" },
        { name: "Paige Heyn", country: "USA", code: "PH" },
        { name: "Liz Akama", country: "Japan", code: "LA" },
    ];

    return (
        <section id="athletes" className="bg-black py-32 border-t border-white/10">
            <div className="max-w-[1440px] mx-auto px-6">
                <h2 className="font-heading font-bold text-7xl md:text-[90px] text-white text-center uppercase mb-32 tracking-tighter">
                    Athletes
                </h2>

                {/* Subsection: Clubs */}
                <div className="mb-32">
                    <h3 className="text-gray-500 text-3xl font-bold uppercase tracking-[0.3em] mb-16 text-center">Clubs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
                        {clubs.map((club, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div className="relative w-full aspect-[4/5] mb-8 transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="absolute inset-0 border-2 border-white/20 group-hover:border-white transition-colors duration-500 rounded-b-[40%] rounded-t-sm"></div>
                                    <div className="absolute inset-0 flex items-center justify-center p-12">
                                        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current opacity-80 group-hover:opacity-100 transition-opacity">
                                            {club.svg}
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="font-heading font-bold text-2xl text-white uppercase tracking-tight text-center">{club.name}</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">{club.country}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subsection: Skaters */}
                <div>
                    <div className="border-t border-white/10 mb-32 max-w-4xl mx-auto"></div>
                    <h3 className="text-gray-500 text-3xl font-bold uppercase tracking-[0.3em] mb-16 text-center">Skaters</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-20">
                        {skaters.map((skater, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div className="relative w-full aspect-[4/5] mb-8 transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="absolute inset-0 border-2 border-white/20 group-hover:border-white transition-colors duration-500 rounded-b-[40%] rounded-t-sm"></div>
                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                        <span className="text-white/20 font-heading font-bold text-6xl group-hover:text-white/40 transition-colors uppercase">{skater.code}</span>
                                    </div>
                                </div>
                                <h3 className="font-heading font-bold text-2xl text-white uppercase tracking-tight text-center">{skater.name}</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">{skater.country}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
