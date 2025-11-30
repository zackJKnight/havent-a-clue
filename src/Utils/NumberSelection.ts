export default function NumberSelectList (playerCount: number, min: number = 1): Array<any> {
    // sanitize and cap the playerCount to avoid invalid array lengths
    const cap = Math.max(0, Math.min(Math.floor(Number(playerCount) || 0), 20));
    const start = Math.max(1, Math.floor(Number(min) || 1));
    if (cap < start) return [];
    const arr = [] as Array<any>;
    for (let i = start; i <= cap; i++) {
        arr.push({ value: i, label: i });
    }
    return arr;
}