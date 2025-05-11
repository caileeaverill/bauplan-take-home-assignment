import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SideNavLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    collapsed?: boolean;
}

export default function SideNavLink({ to, icon, label, collapsed }: SideNavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === to;

    return (
        <Link
            href={to}
            aria-current={isActive ? "page" : undefined}
            className={`group flex items-center font-semibold w-full gap-2 rounded-md px-4 py-2 text-sm transition-all duration-400 ${isActive
                ? "bg-blue-500/10 text-white dark:text-blue-400 "
                : "text-white dark:text-zinc-300 hover:bg-blue-500/10 dark:hover:text-blue-400 border-transparent"
                }`}
        >
            <span className="[&>svg]:w-4 [&>svg]:h-4">
                {icon}
            </span>
            <span
                className={`flex-1 overflow-hidden whitespace-nowrap transition-all duration-200 ${collapsed ? "opacity-0 delay-0" : "opacity-100"
                    }`}
            >
                {label}
            </span>
        </Link>
    );
}