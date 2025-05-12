import BranchFilter from './Filters/BranchFilter'
import UserFilter from './Filters/UserFilter';
import DateFilter from './Filters/DateFilter';
import SearchFilter from './Filters/SearchFilter';
import CommitCount from './Filters/CommitCount';

import { CardTitle } from '../ui/card';

interface FiltersProps {
    branches: string[];
    users: string[];
    selectedUser: string;
    onBranchSelect: (branch: string) => void;
    onUserSelect: (user: string | null) => void;
    onDateSelect: (date: { startDate: Date | null, endDate: Date | null }) => void;
    onSearch: (query: string) => void;
    onCommitCountChange: (count: number) => void;
}

function Filters({ branches = [], users = [], onBranchSelect, onUserSelect, onDateSelect, onSearch, onCommitCountChange }: FiltersProps) {
    const displayedBranches = branches.length > 0 ? branches : [];
    const displayedUsers = users.length > 0 ? users : [];

    const handleCommitCountChange = (count: number) => {
        console.log("Commit Count received in Filters:", count);
        onCommitCountChange(count);
    };

    return (
        <div className='p-8 space-y-4 '>
            <CardTitle>Filter Commits</CardTitle>
            <BranchFilter
                branches={displayedBranches}
                onBranchSelect={onBranchSelect}
            />
            <UserFilter
                users={displayedUsers}
                onUserSelect={(user) => onUserSelect(user ?? '')}
            />
            <DateFilter onDateSelect={onDateSelect} />
            <CommitCount onCommitCountChange={handleCommitCountChange} />
            <SearchFilter onSearch={onSearch} />
        </div>
    );
}

export default Filters