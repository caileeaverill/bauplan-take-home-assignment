import { useState, useEffect } from "react";
import { getConsistentColor } from "@/lib/colorUtil";
import { getInitials } from "@/lib/userInitials";
import { useCommitContext } from "@/context/CommitContext";

export function useCommits(commitCount: number = 25) {
    const { error } = useCommitContext();

    interface APICommit {
        ref?: { name: string, hash: string, type: string };
        authors: { name: string }[];  // Ensure authors is always an array
        message?: string;
        committer?: { name: string };
        committed_date: string;
        color?: string;
    }

    interface ProcessedCommit extends APICommit {
        color: string;
        initials: string;
        shortenedHash: string;
    }

    const [commits, setCommits] = useState<ProcessedCommit[]>([]);

    useEffect(() => {
        async function fetchCommits() {
            try {
                const response = await fetch(`http://localhost:8000/api/commits?limit=${commitCount}`);
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                if (data.commits) {
                    const processedCommits = data.commits.map((commit: APICommit) => {
                        const name = Array.isArray(commit.authors) && commit.authors.length > 0
                            ? commit.authors[0]?.name || 'Unknown'
                            : 'Unknown';
                        const color = getConsistentColor(name)?.base ?? 'bg-gray-500';
                        const initials = getInitials(name);
                        const shortenedHash = commit.ref?.hash?.slice(0, 7) || '';

                        return {
                            ...commit,
                            ref: commit.ref || { name: '', hash: '', type: '' }, // Ensure ref is always defined
                            color,
                            initials,
                            shortenedHash,
                            authors: commit.authors || [],
                        };
                    });
                    setCommits(processedCommits);
                }
            } catch (err) {
                console.error("Error fetching commits:", err);
            }
        }

        fetchCommits();
    }, [commitCount]);

    return { commits: commits as ProcessedCommit[], error };
}