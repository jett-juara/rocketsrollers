export default function SubscribeSection() {
    return (
        <section id="subscribe" className="bg-black py-24 border-t border-white/5">
            <div className="max-w-[800px] mx-auto px-6 flex flex-col items-center">
                {/* Brand Logo */}
                <div className="mb-12">
                    <svg viewBox="0 0 400 120" className="h-16 w-auto">
                        <circle cx="60" cy="60" r="50" fill="#333" />
                        <path d="M40 60 L80 60 M60 40 L60 80" stroke="white" strokeWidth="8" strokeLinecap="round" />
                        <text x="120" y="55" fontFamily="Oswald" fontWeight="bold" fontSize="60" fill="#E31837">TRUE</text>
                        <text x="120" y="105" fontFamily="Oswald" fontWeight="bold" fontSize="60" fill="white">SKATE</text>
                    </svg>
                </div>

                <h2 className="text-white font-heading font-bold text-2xl md:text-3xl uppercase tracking-wider mb-12 text-center">
                    Stay up to date on everything sls
                </h2>

                <form className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Email *</label>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full bg-black border border-white/20 text-white px-4 py-4 text-sm focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Phone</label>
                            <div className="relative flex items-center">
                                <div className="absolute left-4 flex items-center gap-2 pointer-events-none">
                                    <span className="text-lg">🇺🇸</span>
                                    <svg className="w-2 h-2 fill-current text-gray-500" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full bg-black border border-white/20 text-white pl-16 pr-4 py-4 text-sm focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center gap-3 mb-10">
                        <input
                            type="checkbox"
                            id="marketing"
                            required
                            className="w-4 h-4 rounded-none bg-black border-white/20 border-2 checked:bg-white checked:border-white transition-all appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:text-black checked:after:text-[10px] checked:after:left-[2px] checked:after:top-[-1px]"
                        />
                        <label htmlFor="marketing" className="text-gray-400 text-[11px] uppercase font-bold tracking-wide cursor-pointer hover:text-white transition-colors">
                            I agree to receive all marketing communications *
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full rounded-full border border-white/40 text-white font-heading font-bold uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-[0.2em] text-sm"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}
