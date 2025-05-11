'use client'

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideBarChart3, LucideWrench, LucideClipboardEdit, LucideLayers, LucidePlug, LucideKeyRound, LucideCreditCard, LucideMessageCircleQuestion, LucideCog, LucideBookOpenText, ListChecks, ShieldCheck, Users, ChevronLeft, ChevronRight, Home } from "lucide-react";
import SideNavLink from "./SideNavLink";
import SidebarFooter from "./SideNavFooter";


export default function SideNav() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`h-screen ${collapsed ? "w-28" : "w-64"} flex flex-col justify-between p-8 transition-all duration-700 bg-gradient-to-br from-red-600 to-red-700 light:from-red-500 light:to-red-600 dark:from-zinc-900 dark:to-slate-800 dark:bg-gradient-to-br`}>
            {/* Top - Logo */}
            <div>
                <header className="relative mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a
                            href="https://www.bauplanlabs.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 group"
                        >
                            <Image
                                src="/bauplan-logo.svg"
                                alt="logo"
                                width={32}
                                height={32}
                                priority
                                style={{ height: "auto", width: "auto" }}
                                className="transition-transform duration-700 group-hover:rotate-[360deg]"
                            />
                            <span className={`text-white transition-opacity duration-600 font-semibold ${collapsed ? "opacity-0" : "opacity-100"}`}>
                                bauplan
                            </span>
                        </a>
                    </div>

                    <Button
                        variant="link"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className="absolute -right-6 text-muted-foreground hover:text-foreground hover:cursor-pointer"
                    >
                        <span className="text-zinc-300">
                            {collapsed ? <ChevronRight /> : <ChevronLeft />}
                        </span>
                    </Button>
                </header>

                {/* Main Links */}
                <nav className="flex flex-col gap-2" aria-label="Main Navigation">
                    <SideNavLink to="/" icon={<Home />} label="Home" collapsed={collapsed} />
                </nav>
            </div>

            {/* Bottom - Profile / Logout */}
            <SidebarFooter collapsed={collapsed} />
        </aside >
    );
}
