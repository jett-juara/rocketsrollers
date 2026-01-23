export default function Footer() {
    return (
        <footer className="bg-black py-20 border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left">
                    {/* Col 1: Brand (Span 5) */}
                    <div className="md:col-span-5 flex flex-col items-center md:items-start">
                        <div className="text-4xl font-heading font-bold text-white mb-6">SLS</div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm font-body">
                            Street League Skateboarding (SLS) is the premier professional street skateboarding series.
                            Founded in 2010, SLS has grown to become the ultimate global competition for professional skateboarders.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-6 mt-12">
                            <a href="#" className="text-white hover:text-sls-blue transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.335 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.337-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-sls-blue transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-sls-blue transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: League (Span 3) */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-left md:ml-12">
                        <h4 className="text-white font-bold uppercase mb-6 text-sm tracking-widest font-heading">League</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">About SLS</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Careers</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Partners</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Press</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Contact</a></li>
                        </ul>
                    </div>

                    {/* Col 3: Support (Span 4) */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start text-left md:ml-auto">
                        <h4 className="text-white font-bold uppercase mb-6 text-sm tracking-widest font-heading">Support</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Help Center</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Ticketing</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Shop FAQ</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider font-bold">Skaters</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-[#050505] mt-20">
                <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase font-bold tracking-widest">
                    <div>&copy; 2026 Street League Skateboarding.</div>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
