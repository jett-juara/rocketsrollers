import Link from "next/link";

export default function Hero() {
    return (
        <header className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gray-900">
                {/* Visual RocketsRollers */}
                <div
                    className="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-cover bg-center opacity-70"
                ></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-5xl px-4 pt-[100px]">
                <h2 className="text-white font-body font-light tracking-[0.3em] text-xl mb-4 uppercase drop-shadow-lg">RocketsRollers</h2>
                <h1 className="text-white font-slab text-[70px] md:text-[110px] font-bold leading-[0.95] uppercase mb-10 tracking-tighter drop-shadow-2xl">
                    Competition<br />Series #2 2025
                </h1>
                <p className="text-white/80 font-body text-lg md:text-xl mb-10 max-w-2xl mx-auto uppercase tracking-wide">
                    Sirkuit Sepatu Roda Kanjuruhan, Malang <br /> 3 – 5 OKTOBER 2025
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
                    <Link
                        href="/onboarding/join-club"
                        className="bg-white text-black text-[20px] font-heading font-bold uppercase px-12 py-4 rounded-[6px] hover:bg-brand-blue hover:text-white transition-all duration-300 flex items-center gap-3 tracking-wide shadow-xl hover:-translate-y-1"
                    >
                        Daftar Klub
                    </Link>
                    <Link
                        href="/onboarding/confirm-private"
                        className="bg-transparent border-2 border-white text-white text-[20px] font-heading font-bold uppercase px-12 py-4 rounded-[6px] hover:bg-white/10 transition-all duration-300 tracking-wide hover:-translate-y-1"
                    >
                        Daftar Privat
                    </Link>
                </div>
            </div>
        </header>
    );
}
