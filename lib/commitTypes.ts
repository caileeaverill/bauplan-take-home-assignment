export interface ProcessedCommit {
    ref?: { name: string, hash: string, type: string };
    authors: { name: string }[];
    message?: string;
    committer?: { name: string };
    committed_date: string;
    color: string;  // Make sure color is always a string
    initials: string;
    shortenedHash: string;
}