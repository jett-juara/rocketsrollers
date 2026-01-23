export default function NewsSection() {
    const news = [
        {
            date: "Dec 30, 2025",
            title: "SLS 2025 Trick of the Year",
            text: "The Tre Flip heard 'round the world, your SLS 2025 Trick of the Year winner is @chrisjoslin_ 🏆 Congrats Chris! Trick of the Year brought to you by @stake @stakeusa From Chris's \"G-MA\" Part on @thrashermag YT Check out Chris Joslin's celebration ⬇️"
        },
        {
            date: "Dec 28, 2025",
            title: "SLS 2025 People's Champ Award",
            text: "We listened, the runner up earning the SLS 2025 People's Champ Award is @tjrogers 🔫 that SW 180 was something else! B2YB @stake @stakeusa From TJ's \"Happy Friday\" part on @thrashermag YT"
        },
        {
            date: "Dec 27, 2025",
            title: "SLS 2025 Mind Melter Award Presented by Monster Energy",
            text: "Insane control and creativity, this manual combo by @ryanconnors is well deserving of the SLS 2025 Mind Melter Award Presented by Monster Energy 🥤 From Ryan's part in @swim_skateboardco video \"Grinding the Tape\" on YT"
        },
        {
            date: "Dec 27, 2025",
            title: "SLS 2025 Style Matters Award Presented by BB Seguros",
            text: "Must be nice to skate like @daikyhoshino_, big congrats on winning the SLS 2025 Style Matters Award Presented by BB Seguros 👋 From Daiki's part in @hufworldwide \"Box Truck\" video"
        }
    ];

    return (
        <div className="max-w-none bg-white text-black py-20">
            <div className="max-w-[1440px] mx-auto px-6">
                <h2 className="font-heading font-bold text-[80px] uppercase text-center mb-16 tracking-tighter">News</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-16">
                    {news.map((item, idx) => (
                        <div key={idx} className="border border-gray-200 p-8 flex flex-col items-start h-full hover:border-black transition-colors duration-300">
                            <span className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-wider">{item.date}</span>
                            <h3 className="font-body font-bold text-2xl mb-4 leading-tight">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-800 mb-6">{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <a href="#" className="inline-block border border-black rounded-full px-12 py-3 text-sm font-bold text-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        More News
                    </a>
                </div>
            </div>
        </div>
    );
}
