"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminGuard from "@/components/auth/AdminGuard";
import Header from "@/components/layout/Header";
import {
    LayoutDashboard,
    Newspaper,
    CalendarDays,
    Image as ImageIcon,
    Users,
    Home,
    Settings
} from "lucide-react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Global Settings", icon: Settings, path: "/admin/cms" },
        { name: "Hero Editor", icon: Home, path: "/admin/cms/hero" },
        { name: "News Manager", icon: Newspaper, path: "/admin/cms/news" },
        { name: "Events & Handbook", icon: CalendarDays, path: "/admin/cms/events" },
        { name: "Partners & Sponsors", icon: ImageIcon, path: "/admin/cms/partners" },
        { name: "Member Spotlight", icon: Users, path: "/admin/cms/spotlight" },
    ];

    return (
        <AdminGuard>
            <main className="min-h-screen bg-black text-white">
                <Header />
                <div className="flex pt-24 h-screen overflow-hidden">
                    {/* Sidebar */}
                    <aside className="w-80 border-r border-white/5 bg-zinc-900/20 backdrop-blur-xl p-8 flex flex-col gap-10">
                        <div>
                            <span className="text-zinc-500 font-heading font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
                                Content Management
                            </span>
                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-heading font-black uppercase text-[10px] tracking-widest transition-all ${isActive
                                                    ? "bg-brand-blue text-white shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
                                                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-brand-blue"}`} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="mt-auto">
                            <Link
                                href="/admin"
                                className="flex items-center gap-4 px-6 py-4 rounded-2xl font-heading font-black uppercase text-[10px] tracking-widest text-zinc-500 hover:text-white transition-all"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Back to Main Admin
                            </Link>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <section className="flex-1 overflow-y-auto p-12 bg-gradient-to-br from-zinc-950 to-black">
                        {children}
                    </section>
                </div>
            </main>
        </AdminGuard>
    );
}
