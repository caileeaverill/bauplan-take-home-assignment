import { useState } from "react";

interface ProcessedCommit {
    color: string;
    initials: string;
    shortenedHash: string;
    ref?: {
        hash?: string;
        name?: string;
        type?: string;
    };
}

export function useCommitHandlers(commits: ProcessedCommit[]) {
    const [selectedCommit, setSelectedCommit] = useState<ProcessedCommit | null>(null);
    const [selectedCommitIndex, setSelectedCommitIndex] = useState<number>(0);

    const handleSelectCommit = (commit: ProcessedCommit) => {
        const index = commits.findIndex((c: ProcessedCommit) => c.ref?.hash === commit.ref?.hash);
        setSelectedCommitIndex(index);
        setSelectedCommit(commit);
    };

    const handleNextCommit = () => {
        if (selectedCommitIndex < commits.length - 1) {
            const nextCommit = commits[selectedCommitIndex + 1];
            setSelectedCommit(nextCommit);
            setSelectedCommitIndex(selectedCommitIndex + 1);
        }
    };

    const handlePreviousCommit = () => {
        if (selectedCommitIndex > 0) {
            const prevCommit = commits[selectedCommitIndex - 1];
            setSelectedCommit(prevCommit);
            setSelectedCommitIndex(selectedCommitIndex - 1);
        }
    };

    const hasNext = selectedCommitIndex < commits.length - 1;
    const hasPrevious = selectedCommitIndex > 0;

    return {
        selectedCommit,
        handleSelectCommit,
        handleNextCommit,
        handlePreviousCommit,
        hasNext,
        hasPrevious,
    };
}