const colors = [
    { base: "bg-blue-500" },
    { base: "bg-green-500" },
    { base: "bg-red-500" },
    { base: "bg-yellow-500" },
    { base: "bg-purple-500" },
    { base: "bg-pink-500" },
    { base: "bg-teal-500" },
    { base: "bg-indigo-500" },
    { base: "bg-orange-500" }
];

const colorMap = new Map<string, { base: string }>();

export function getConsistentColor(name: string) {
    if (colorMap.has(name)) {
        return colorMap.get(name) || { base: "bg-gray-400" };
    }
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = colors[hash % colors.length] || { base: "bg-gray-400" };
    colorMap.set(name, color);
    return color;
}

export function getRandomColor(name: string) {
    return getConsistentColor(name);
}