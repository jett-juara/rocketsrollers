import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 bg-[url('/images/hero_bg.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block border-2 border-white px-4 py-2 mb-4 hover:border-brand-blue transition-colors group">
                        <span className="font-heading font-bold text-3xl tracking-tighter text-white group-hover:text-brand-blue transition-colors">RR</span>
                    </Link>
                    <h1 className="text-2xl font-slab font-bold text-white uppercase tracking-tight">Daftar RocketsRollers</h1>
                </div>

                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden mb-6",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            formButtonPrimary: "bg-white text-black hover:bg-brand-blue hover:text-white transition-all duration-300 font-heading font-bold uppercase tracking-tight py-3 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]",
                            socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all rounded-lg py-2.5",
                            socialButtonsBlockButtonText: "text-white font-body font-medium",
                            formFieldLabel: "text-white/60 uppercase text-[10px] tracking-[0.2em] font-bold mb-1.5",
                            formFieldInput: "bg-black/40 border-white/5 text-white focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all rounded-lg py-2.5",
                            identityPreviewText: "text-white font-body",
                            identityPreviewEditButtonIcon: "text-brand-blue",
                            formFieldErrorText: "text-red-400 text-[10px] italic",
                            dividerLine: "bg-white/5",
                            dividerText: "text-white/30 uppercase text-[9px] tracking-widest",
                            footer: "hidden" // Total hide footer to remove branding 100%
                        }
                    }}
                />
            </div>
        </div>
    );
}
