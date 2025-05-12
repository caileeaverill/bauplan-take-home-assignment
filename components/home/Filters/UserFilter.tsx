import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface UserFilterProps {
    users: string[];
    onUserSelect: (user: string | null) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ users, onUserSelect }) => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleUserSelect = (user: string) => {
        const selected = user === "none" ? null : user;
        setSelectedUser(selected);
        onUserSelect(selected);
    };

    return (
        <div className="w-full">
            <div className="text-zinc-400 text-xs font-medium mb-1">Filter by user</div>
            <Select onValueChange={handleUserSelect}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedUser || "Select a User"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">
                        Deselect Users
                    </SelectItem>
                    {users.map((user, index) => (
                        <SelectItem key={index} value={user}>
                            {user}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default UserFilter;