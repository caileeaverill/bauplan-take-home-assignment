import { shortenHash } from "@/lib/hashShortener";
import { getInitials } from "@/lib/userInitials";
import { formatDate } from "@/lib/formatDateAndTime";
import { getConsistentColor } from "@/lib/colorUtil";
import { ProcessedCommit } from "@/lib/commitTypes";

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

export function filterByBranch(commits: Commit[], selectedBranch: string): Commit[] {
    if (!selectedBranch) return commits;
    return commits.filter(commit => commit.ref?.name === selectedBranch);
}

export function filterByAuthor(commits: Commit[], selectedAuthor: string): Commit[] {
    if (!selectedAuthor) return commits;
    return commits.filter(commit =>
        Array.isArray(commit.authors) && commit.authors[0]?.name === selectedAuthor
    );
}

export function filterByDate(commits: Commit[], startDate: string, endDate: string): Commit[] {
    if (!startDate || !endDate) return commits;
    return commits.filter(commit => {
        const commitDate = new Date(commit.committed_date ?? new Date().toISOString()).toISOString().split("T")[0];
        return commitDate >= startDate && commitDate <= endDate;
    });
}

export function filterBySearch(commits: Commit[], searchQuery: string): Commit[] {
    if (!searchQuery) return commits;
    return commits.filter(commit =>
        (commit.message ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );
}

export function applyFilters(
    commits: Commit[],
    branch: string,
    author: string,
    startDate: string,
    endDate: string,
    searchQuery: string
): ProcessedCommit[] {
    const processedCommits = processCommits(commits);
    let filteredCommits = processedCommits;
    filteredCommits = filterByBranch(filteredCommits, branch);
    filteredCommits = filterByAuthor(filteredCommits, author);
    filteredCommits = filterByDate(filteredCommits, startDate, endDate);
    filteredCommits = filterBySearch(filteredCommits, searchQuery);
    return filteredCommits;
}

export function groupCommitsByDate(commits: Commit[]): { title: string, commits: Commit[] }[] {
    if (commits.length === 0) return [];

    const groupedCommits: { title: string, commits: Commit[] }[] = [];
    let currentGroup: Commit[] = [];
    let lastDate = new Date(commits[0].committed_date ?? new Date().toISOString());
    let groupTitle = formatDate(lastDate.toISOString());

    for (const commit of commits) {
        const commitDate = new Date(commit.committed_date ?? new Date().toISOString());

        if (formatDate(commitDate.toISOString()) !== groupTitle) {
            groupedCommits.push({ title: groupTitle, commits: currentGroup });
            currentGroup = [commit];
            groupTitle = formatDate(commitDate.toISOString());
        } else {
            currentGroup.push(commit);
        }

        lastDate = commitDate;
    }

    if (currentGroup.length > 0) {
        groupedCommits.push({ title: groupTitle, commits: currentGroup as ProcessedCommit[] });
    }

    return groupedCommits;
}

// Process each commit to add initials, shortened hash, and color
export function processCommits(commits: any[]): any[] {
    return commits.map(commit => {
        const name = commit?.authors && Array.isArray(commit.authors) && commit.authors.length > 0 && commit.authors[0]?.name ? commit.authors[0]?.name : 'Unknown';
        const hash = commit?.ref?.hash ?? 'unknown';
        const color = getConsistentColor(name)?.base ?? 'bg-gray-500';

        if (commit && typeof commit === 'object') {
            commit.initials = getInitials(name) ?? 'NA';
            commit.shortenedHash = hash ? shortenHash(hash) : 'unknown';
        }

        if (commit && typeof commit === 'object') {
            commit.color = color ?? 'bg-gray-500';
        }

        return commit;
    });
}