import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface CommitCountProps {
    onCommitCountChange: (count: number) => void;
}

const CommitCount: React.FC<CommitCountProps> = ({ onCommitCountChange }) => {
    const [commitCount, setCommitCount] = useState<number>(25);

    const handleCountChange = (value: string) => {
        const intValue = parseInt(value, 10);
        setCommitCount(intValue);
        console.log("Selected Commit Count:", intValue);
        onCommitCountChange(intValue);
    };

    return (
        <div className="w-full">
            <div className="text-zinc-400 text-xs font-medium mb-1">Number of commits</div>
            <Select onValueChange={handleCountChange} defaultValue="25">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Commits: ${commitCount}`} />
                </SelectTrigger>
                <SelectContent>
                    {[25, 50, 75, 100].map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                            {count}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default CommitCount;