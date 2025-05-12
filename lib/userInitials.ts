export function getInitials(name: string): string {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const firstInitial = parts[0]?.charAt(0) || "";
    const lastInitial = parts[1]?.charAt(0) || "";
    return (firstInitial + lastInitial).toUpperCase();
}
