import React, { useState } from 'react'
import { formatDateTime } from '@/lib/formatDateAndTime';
import { getInitials } from '@/lib/userInitials';
import { getConsistentColor } from '@/lib/colorUtil';
import { ClipboardPenIcon, CheckCircleIcon, XCircleIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CommitDetailsProps {
    commit: {
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
    } | null | undefined;
    color?: string;
    onNextCommit: () => void;
    onPreviousCommit: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

function CommitDetails({ commit, onNextCommit, onPreviousCommit, hasNext, hasPrevious }: CommitDetailsProps) {
    const color = commit?.color ?? 'bg-gray-500';
    const [copied, setCopied] = useState(false);

    if (!commit) {
        return (
            <div className='p-6'>
                <CardHeader className="p-0 mb-8">
                    <CardTitle>Commit Details</CardTitle>
                    <CardDescription className='break-all flex justify-between items-center gap-2 break-words'>
                        Select a commit to view more information
                    </CardDescription>
                </CardHeader>

            </div>
        )
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(commit?.ref?.hash || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    console.log(commit);


    const authorColor = commit?.authors?.[0]?.name ? getConsistentColor(commit.authors[0].name).base : 'bg-gray-400';
    const committerColor = commit?.committer?.name ? getConsistentColor(commit.committer.name).base : 'bg-gray-400';

    return (
        <div className='p-6'>
            <CardHeader className="p-0 mb-8">
                <CardTitle>Commit Details</CardTitle>
                <CardDescription className='break-all flex justify-between items-center gap-2'>
                    <div>{commit?.ref?.hash}</div>
                    {
                        commit?.ref?.hash && (
                            <button onClick={handleCopy}>
                                {copied ? <CheckCircleIcon /> : <ClipboardPenIcon />}
                            </button>
                        )
                    }
                </CardDescription>
            </CardHeader>

            <CardContent className=' p-4 bg-gray-50'>
                <div>
                    <p className='text-xs font-semibold text-zinc-600'>Commit Message:</p>
                    <p className='text-md text-zinc-900 break-words'>{commit?.message || "No message available"}</p>
                </div>
                <p className='text-right text-xs text-zinc-500 mt-4'>parent: {commit?.parent_ref?.hash?.slice(0, 7) || "N/A"}</p>
            </CardContent>
            <CardFooter className='p-0 py-2'>
                <div className="flex flex-col items-center gap-2">
                    {/* Author Details */}
                    <div className='flex w-full min-w-8 items-center gap-3'>
                        {commit?.authors?.[0]?.name && (
                            <span className={`flex justify-center items-center rounded-full w-8 h-8 text-xs px-4 font-bold text-white ${authorColor}`}>
                                {getInitials(commit?.authors?.[0]?.name || "")}
                            </span>
                        )}
                        <div className='my-2'>
                            {commit?.authors?.map((author, index) => (
                                <div key={index}>
                                    {author.name && (
                                        <p className='text-xs font-semibold text-zinc-600'>{author.name}</p>
                                    )}
                                    {author.email && (
                                        <p className='text-xs text-zinc-500'>{author.email}</p>
                                    )}
                                </div>
                            ))}
                            {commit?.authored_date && (
                                <p className='text-xs text-zinc-500'>Authored: {formatDateTime(commit.authored_date)}</p>
                            )}
                        </div>
                    </div>
                </div>
            </CardFooter>

            {/* Navigation Buttons */}
            <div className='flex justify-evenly mb-4 md:absolute bottom-4 w-full'>
                <button
                    onClick={onPreviousCommit}
                    disabled={!hasPrevious}
                    className={`text-blue-500 flex items-center gap-1 hover:cursor-pointer ${!hasPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <ChevronLeft /> Previous
                </button>
                <button
                    onClick={onNextCommit}
                    disabled={!hasNext}
                    className={`text-blue-500 flex items-center gap-1 hover:cursor-pointer ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Next <ChevronRight />
                </button>
            </div>
        </div>
    )
}

export default CommitDetails