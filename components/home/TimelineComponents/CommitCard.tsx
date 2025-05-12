

import React from "react";
import { shortenHash } from "@/lib/hashShortener";
import { getInitials } from "@/lib/userInitials";
import { formatDateTime } from "@/lib/formatDateAndTime";

interface CommitCardProps {
    commit: any;
    onSelect: (commit: any) => void;
    isSelected: boolean;
}

const CommitCard: React.FC<CommitCardProps> = ({ commit, onSelect, isSelected }) => {
    const initials = getInitials(commit.authors[0]?.name);
    const hash = shortenHash(commit.ref.hash);
    const dateTime = formatDateTime(commit.committed_date);

    return (
        <div
            className={`p-4 border-b cursor-pointer ${isSelected ? "bg-gray-200" : "bg-white"}`}
            onClick={() => onSelect(commit)}
        >
            <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">
                    {initials}
                </div>
                <div>
                    <p className="text-xs text-gray-600">{hash} - {dateTime}</p>
                </div>
            </div>
            <p className="mt-2 text-sm">{commit.message}</p>
        </div>
    );
};

export default CommitCard;