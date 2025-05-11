'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Commit {
    authors: { name: string, email: string }[];
    authored_date: string;
    committer: { name: string, email: string };
    ref: { name: string, hash: string };
    parent_hashes: string[];
    message: string;
}

interface CommitContextType {
    commits: Commit[];
    error: string | null;
}

const CommitContext = createContext<CommitContextType | undefined>(undefined);

export function CommitProvider({ children }: { children: React.ReactNode }) {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/commits')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => setCommits(data.commits))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <CommitContext.Provider value={{ commits, error }}>
            {children}
        </CommitContext.Provider>
    );
}

export function useCommitContext() {
    const context = useContext(CommitContext);
    if (!context) {
        throw new Error('useCommitContext must be used within a CommitProvider');
    }
    return context;
}