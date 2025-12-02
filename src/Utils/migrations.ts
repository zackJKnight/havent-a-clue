import { Game } from "../Model/Game.js";

export function migratePossShownBy(game: Game) {
    if (!game || !game.cards) return game;
    for (const card of game.cards) {
        // if PossShownBy is an array (old format), convert to map
        // old format example: [1,2,2,3]
        if (Array.isArray((card as any).PossShownBy)) {
            const arr: number[] = (card as any).PossShownBy as number[];
            const map: Record<number, number> = {};
            for (const id of arr) {
                if (typeof id !== 'number') continue;
                map[id] = (map[id] || 0) + 1;
            }
            (card as any).PossShownBy = map;
        }
        // if undefined, ensure it exists as an object
        if (!card.PossShownBy) {
            card.PossShownBy = {} as Record<number, number>;
        }
        // ensure SeenBy exists
        if (!Array.isArray((card as any).SeenBy)) {
            (card as any).SeenBy = [] as number[];
        }
    }
    return game;
}

export default migratePossShownBy;
