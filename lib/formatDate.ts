export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',  // e.g., "May"
        day: 'numeric',  // e.g., "11"
        year: 'numeric'  // e.g., "2025"
    };
    return date.toLocaleDateString('en-US', options);
}
