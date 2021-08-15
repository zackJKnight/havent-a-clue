import { Category } from "./Category"

export class ClueCard {
    Category: Category;
    Name: string
    HeldBy: number
    NotHeldBy: number[]
    PossShownBy: {
        playerId: number,
        inRound: number
    }
    constructor(name: string, category: Category) {
        this.Category = category;
        this.Name = name;
        this.HeldBy = 0;
        this.NotHeldBy = [];
        this.PossShownBy = { playerId: 0, inRound: -1 };
    }
}
