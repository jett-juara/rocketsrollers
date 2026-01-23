"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function Header() {
    const { user } = useUser();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const isAdmin = athlete?.role === "superadmin" || athlete?.role === "admin";

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            id="main-header"
            className={`fixed w-full top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="max-w-[1366px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left Nav */}
                <nav className="hidden lg:flex items-center space-x-6">
                    <Link href="/" className="nav-item active text-brand-white font-body text-[12px] uppercase font-light tracking-wider hover:text-brand-blue transition-colors">Home</Link>
                    <Link href="/news" className="nav-item text-brand-white font-body text-[12px] uppercase font-light tracking-wider hover:text-brand-blue transition-colors">News</Link>
                    <Link href="/schedule" className="nav-item text-brand-white font-body text-[12px] uppercase font-light tracking-wider hover:text-brand-blue transition-colors">Schedule</Link>
                    <Link href="/results" className="nav-item text-brand-white font-body text-[12px] uppercase font-light tracking-wider hover:text-brand-blue transition-colors">Results</Link>
                    <Link href="/gallery" className="nav-item text-brand-white font-body text-[12px] uppercase font-light tracking-wider hover:text-brand-blue transition-colors">Gallery</Link>

                    {isAdmin && (
                        <Link href="/admin" className="nav-item text-brand-blue font-heading text-[12px] uppercase font-bold tracking-wider hover:text-white transition-colors border border-brand-blue/30 px-3 py-1 rounded">
                            Admin Panel
                        </Link>
                    )}
                </nav>

                {/* Logo (Center) */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
                    <div className="border-2 border-white px-3 py-1.5 transition-colors group-hover:border-brand-blue">
                        <span className="font-heading font-bold text-2xl tracking-tighter group-hover:text-brand-blue transition-colors">RR</span>
                    </div>
                </Link>

                {/* Right Nav */}
                <div className="flex items-center space-x-8">
                    <nav className="hidden lg:flex items-center space-x-6">
                        <SignedOut>
                            <Link href="/login" className="nav-item text-brand-white font-body text-[12px] uppercase font-light tracking-wider hover:text-brand-blue transition-colors">Login</Link>

                            {/* Pendaftaran Button */}
                            <Link
                                href="/register"
                                className="ml-4 bg-white text-black text-sm font-heading font-bold uppercase px-5 py-2 rounded-[6px] hover:bg-gray-200 transition-colors flex items-center gap-2 leading-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                            >
                                Daftar Sekarang
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-10 h-10 border border-white/20"
                                    }
                                }}
                            />
                        </SignedIn>
                    </nav>

                    {/* Mobile Menu Button (Hamburger) - Logic to be added later if needed */}
                    <button className="lg:hidden text-white ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
