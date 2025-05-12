export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',  // e.g., "May"
        day: 'numeric',  // e.g., "11"
        year: 'numeric'  // e.g., "2025"
    };
    return date.toLocaleDateString('en-US', options);
}

export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}

export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',    // e.g., "May"
        day: 'numeric',    // e.g., "11"
        year: 'numeric',   // e.g., "2025"
        hour: '2-digit',   // e.g., "02"
        minute: '2-digit', // e.g., "30"
        second: '2-digit', // e.g., "05"
        hour12: true       // Use 12-hour format with AM/PM
    };
    return date.toLocaleString('en-US', options);
}

export function getTimeDifferenceInHours(date1: string, date2: string): number {
    const time1 = new Date(date1).getTime();
    const time2 = new Date(date2).getTime();
    const differenceInMilliseconds = Math.abs(time1 - time2);
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    return differenceInHours;
}