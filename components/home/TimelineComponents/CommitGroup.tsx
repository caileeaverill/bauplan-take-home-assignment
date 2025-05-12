

import React from "react";
import CommitCard from "./CommitCard";

interface CommitGroupProps {
    title: string;
    commits: any[];
    onSelectCommit: (commit: any) => void;
    selectedCommit: any;
}

const CommitGroup: React.FC<CommitGroupProps> = ({ title, commits, onSelectCommit, selectedCommit }) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            {commits.map((commit) => (
                <CommitCard
                    key={commit.ref.hash}
                    commit={commit}
                    onSelect={onSelectCommit}
                    isSelected={selectedCommit?.ref.hash === commit.ref.hash}
                />
            ))}
        </div>
    );
};

export default CommitGroup;