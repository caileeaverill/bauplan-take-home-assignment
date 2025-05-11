interface SidebarFooterProps {
    collapsed: boolean;
}

export default function SidebarFooter({ collapsed }: SidebarFooterProps) {
    return (
        <footer className="flex flex-col items-start gap-2 w-full px-3 py-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
                {!collapsed && (
                    <p className="truncate overflow-hidden whitespace-nowrap transition-opacity duration-600 text-left">
                        All Systems Operational
                    </p>
                )}
                <div className="relative flex items-center justify-center w-4 h-4" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
            </div>
            <p className="text-xs text-zinc-300">v1.0</p>
        </footer>
    );
}