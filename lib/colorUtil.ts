

const colors = [
    { base: "bg-blue-500", faded: "bg-blue-500/20", border: "border-blue-700" },
    { base: "bg-green-500", faded: "bg-green-500/20", border: "border-green-700" },
    { base: "bg-red-500", faded: "bg-red-500/20", border: "border-red-700" },
    { base: "bg-yellow-500", faded: "bg-yellow-500/20", border: "border-yellow-700" },
    { base: "bg-purple-500", faded: "bg-purple-500/20", border: "border-purple-700" },
    { base: "bg-pink-500", faded: "bg-pink-500/20", border: "border-pink-700" },
    { base: "bg-teal-500", faded: "bg-teal-500/20", border: "border-teal-700" },
    { base: "bg-indigo-500", faded: "bg-indigo-500/20", border: "border-indigo-700" },
    { base: "bg-orange-500", faded: "bg-orange-500/20", border: "border-orange-700" }
];

let lastColorIndex = -1;

export function getRandomColor() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * colors.length);
    } while (randomIndex === lastColorIndex);
    lastColorIndex = randomIndex;
    return colors[randomIndex];
}