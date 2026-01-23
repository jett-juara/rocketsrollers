export default function PartnersSection() {
    const partners = [
        { name: "SKATE CO.", size: "text-24", height: "h-8", svg: <text x="0" y="30" className="font-heading font-bold font-size-[24px]">SKATE CO.</text> },
        { name: "TECHGEAR", size: "text-28", height: "h-9", svg: <text x="0" y="30" className="font-heading font-bold font-size-[28px]" letterSpacing="2">TECHGEAR</text> },
        {
            name: "STREETWEAR", height: "h-7", svg: (
                <>
                    <rect x="0" y="5" width="30" height="30" rx="4" className="fill-black group-hover:fill-sls-blue transition-colors" />
                    <text x="40" y="30" className="font-heading font-bold font-size-[24px]">STREETWEAR</text>
                </>
            )
        },
        {
            name: "RUSH", height: "h-8", svg: (
                <>
                    <path d="M10 5 L30 35 M30 5 L10 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <text x="45" y="30" className="font-heading font-bold font-size-[24px]">RUSH</text>
                </>
            )
        },
        {
            name: "GLIDE", height: "h-9", svg: (
                <>
                    <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="45" y="30" className="font-heading font-bold font-size-[26px]">GLIDE</text>
                </>
            )
        },
        { name: "VELOCITY", height: "h-8", svg: <text x="0" y="30" className="font-heading font-bold font-size-[24px]">VELOCITY</text> },
        {
            name: "PEAK", height: "h-8", svg: (
                <>
                    <path d="M0 20 L15 5 L30 20 L15 35 Z" className="fill-black group-hover:fill-sls-blue transition-colors" />
                    <text x="40" y="30" className="font-heading font-bold font-size-[24px]">PEAK</text>
                </>
            )
        },
    ];

    return (
        <section id="partners" className="bg-white py-20 border-t border-black/5">
            <div className="max-w-[1440px] mx-auto px-6">
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-12 text-center">Official Partners</h4>
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
                    {partners.map((partner, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <svg viewBox="0 0 160 40" className={`${partner.height} group-hover:text-sls-blue transition-colors duration-300 fill-current text-black`}>
                                {partner.svg}
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
