import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Badge } from "@/components/ui/badge"

import { formatRelativeDate, } from "@/lib/formatDateAndTime";
import { groupCommitsByDate, processCommits } from "@/lib/commitUtils";
import { ProcessedCommit } from "@/lib/commitTypes";

import { useEffect } from 'react';

interface Commit {
    color?: string;
    initials?: string;
    shortenedHash?: string;
    ref?: {
        name?: string;
        hash?: string;
        type?: string;
    };
    authors?: Array<{ name?: string; email?: string }>;
    committed_date?: string;
    message?: string;
    branch?: string;
    committer?: { name?: string; email?: string };
    authored_date?: string;
    parent_ref?: { hash?: string };
}

interface TimelineProps {
    commits: ProcessedCommit[];
    onSelectCommit: (commit: ProcessedCommit) => void;
    selectedCommit?: ProcessedCommit | null;
}

function Timeline({ commits, onSelectCommit, selectedCommit }: TimelineProps) {
    // Defensive check for empty or malformed commit data
    if (!commits || commits.length === 0) {
        return (
            <Card className="gap-0 rounded-none border-none h-[calc(100vh-64px)] overflow-y-scroll">
                <CardContent className="p-4 space-y-2">
                    <CardTitle>No Commits</CardTitle>
                    <CardDescription>There are no commits to display.</CardDescription>
                </CardContent>
            </Card>
        );
    }

    const processedCommits: ProcessedCommit[] = processCommits(commits as ProcessedCommit[]);

    useEffect(() => {
        if (selectedCommit?.ref?.hash) {
            const element = document.getElementById(`commit-${selectedCommit.ref.hash}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [selectedCommit]);

    const renderGroup = (group: { title: string, commits: Commit[] }, title: string) => (
        <div key={title}>
            <div className="px-4 text-zinc-600 text-sm font-bold my-2">{title}</div>
            {group.commits.map((commit) => (
                <div
                    id={`commit-${commit.ref?.hash}`}
                    key={commit.ref?.hash}
                    className={`relative px-8 py-2 cursor-pointer transition-all duration-300 ${selectedCommit?.ref?.hash === commit.ref?.hash ? 'bg-zinc-100' : 'bg-transparent'
                        } hover:bg-zinc-100`}
                    onClick={() => onSelectCommit(commit)}
                >
                    <span className="absolute w-0.5 h-full bg-zinc-300 top-0 left-8"></span>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className={`absolute flex justify-center items-center top-0 translate-y-1/2 left-4.5 rounded-full w-8 h-8 text-xs font-bold text-white ${commit.color ?? 'bg-gray-500'}`}>
                                {commit.initials}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{commit.authors?.[0]?.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <CardContent className="py-8 pt-0">
                        <CardTitle className="flex items-center gap-2">
                            <span>{commit.shortenedHash}</span>
                            <span>·</span>
                            <Badge className="lowercase" variant="outline">{commit.ref?.type}</Badge>
                        </CardTitle>
                        <CardDescription>
                            {commit.message}
                            <p className="text-xs text-zinc-500">
                                {formatRelativeDate(commit.committed_date ?? '')}
                            </p>
                        </CardDescription>
                    </CardContent>
                </div>
            ))}
        </div>
    );

    const groupedCommits = groupCommitsByDate(processedCommits).map(group => renderGroup(group, group.title));

    return (
        <Card className="gap-0 rounded-none border-none h-[calc(100vh-64px)] overflow-y-scroll">
            <CardContent className="px-4 mb-4 flex items-center">
                <CardTitle className="text-right">{`Displaying ${processedCommits.length} commits`}</CardTitle>
            </CardContent>
            {groupedCommits}
        </Card>
    );
}

export default Timeline;