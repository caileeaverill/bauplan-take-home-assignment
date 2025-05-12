

// String Match Utility
export function stringIncludes(value: string, search: string): boolean {
    return value.toLowerCase().includes(search.toLowerCase());
}

// Date Comparison Utility
export function isDateInRange(date: string, startDate: string, endDate: string): boolean {
    return date >= startDate && date <= endDate;
}

// Unique Array Utility
export function uniqueArray<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

// Sort Array Utility
export function sortArray<T extends string>(arr: T[]): T[] {
    return arr.sort((a, b) => a.localeCompare(b));
}