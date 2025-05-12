import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface BranchFilterProps {
    branches: string[];
    onBranchSelect: (branch: string) => void;
}

const BranchFilter: React.FC<BranchFilterProps> = ({ branches, onBranchSelect }) => {
    const [selectedBranch, setSelectedBranch] = useState<string | null>(branches[0] || null);

    const handleBranchSelect = (branch: string) => {
        setSelectedBranch(branch);
        onBranchSelect(branch);
    };

    return (
        <div className="w-full">
            <div className="text-zinc-400 text-xs font-medium mb-1">Filter by branch</div>
            <Select onValueChange={handleBranchSelect}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedBranch || branches[0] || "Select a branch"} />
                </SelectTrigger>
                <SelectContent>
                    {branches.map((branch, index) => (
                        <SelectItem key={index} value={branch}>
                            {branch}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default BranchFilter;