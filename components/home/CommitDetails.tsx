import { useState } from 'react';

interface CommitDetailsProps {
    commit: any;
    onClose: () => void;
}

function CommitDetails({ commit, onClose }: CommitDetailsProps) {
    if (!commit) return null;

    return (
        <div className="sticky top-0 flex flex-col p-8 bg-white h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Commit Details</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    ✕
                </button>
            </div>
            <div className="space-y-2">
                <p><span className="font-semibold">Message:</span> {commit.message}</p>
                <p><span className="font-semibold">Author:</span> {commit.authors[0]?.name}</p>
                <p><span className="font-semibold">Timestamp:</span> {new Date(commit.timestamp).toLocaleString()}</p>
                <p><span className="font-semibold">Hash:</span> {commit.hash}</p>
                <p><span className="font-semibold">Branch:</span> {commit.ref.name}</p>
            </div>
        </div>
    );
}

export default CommitDetails;