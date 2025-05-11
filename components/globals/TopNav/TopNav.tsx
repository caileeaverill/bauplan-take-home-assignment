import { UserCircle } from "lucide-react";

export default function TopNav() {


    return (
        <header className="w-full h-16 border-b border-slate-300 dark:border-slate-800 flex items-center justify-end px-8" aria-label="Top Navigation">
            <div className="flex items-center gap-4">
                <UserCircle className="size-6" />
            </div>
        </header>
    );
}