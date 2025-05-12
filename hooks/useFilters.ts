import { useState } from 'react';

export function useFilters() {
    const [filters, setFilters] = useState({
        branch: "main",
        author: "",
        date: { startDate: "", endDate: "" },
        searchQuery: ""
    });

    const updateFilter = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleBranchSelect = (branch: string) => updateFilter("branch", branch);
    const handleUserSelect = (user: string | null) => updateFilter("author", user ?? "");
    const handleSearch = (query: string) => updateFilter("searchQuery", query);
    const handleDateSelect = ({ startDate, endDate }: { startDate: Date | null, endDate: Date | null }) => {
        if (startDate && endDate) {
            updateFilter("date", {
                startDate: startDate.toISOString().split("T")[0],
                endDate: endDate.toISOString().split("T")[0],
            });
        } else {
            updateFilter("date", { startDate: "", endDate: "" });
        }
    };

    return {
        filters,
        setFilters,
        handleBranchSelect,
        handleUserSelect,
        handleDateSelect,
        handleSearch,
    };
}
