import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


import { getRandomColor } from "@/lib/colorUtil";
import { formatDate } from "@/lib/formatDate";

function Timeline({ commits, onSelectCommit }) {
    const authorColors = {};
    let colorIndex = 0;

    for (let i = 0; i < commits.length; i++) {
        const name = commits[i].authors[0].name;
        const hash = commits[i].ref.hash;
        const shortenedHash = hash.slice(0, 7);

        if (name) {
            const firstInitial = name.charAt(0);
            const lastNameInitial = name.split(" ")[1]?.charAt(0) || "";
            commits[i].initials = `${firstInitial}${lastNameInitial}`;

            const color = authorColors[name] || getRandomColor();
            commits[i].color = color.base;
            commits[i].fadedColor = color.faded;
            commits[i].borderColor = color.border;
            authorColors[name] = color;
        }

        commits[i].shortenedHash = shortenedHash;
    }

    return (
        <>
            <Card className="gap-0">
                <CardHeader className="mb-8 border-b border-b-zinc-300">
                    <CardTitle>Main</CardTitle>
                    <CardDescription>Branch Commits</CardDescription>
                </CardHeader>
                {
                    commits.map((commit) => (
                        <div className="relative px-8" key={commit.ref.hash}>
                            <span className="absolute w-0.5 h-full bg-zinc-300 top-0 left-8">
                            </span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className={`absolute flex justify-center items-center top-0 left-4.5 rounded-full w-8 h-8 text-xs font-bold text-white ${commit.color}`}>
                                        {commit.initials}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{commit.authors[0].name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <CardContent className="py-8 pt-0">
                                <CardTitle className="flex items-center gap-4">
                                    <span>
                                        {commit.shortenedHash}
                                    </span>
                                    <span className="text-sm font-normal text-zinc-500">
                                        {formatDate(commit.committed_date)}
                                    </span>
                                </CardTitle>
                                <CardDescription>{commit.message}</CardDescription>
                            </CardContent>
                        </div>
                    ))
                }
            </Card>
        </>
    );
}

export default Timeline;