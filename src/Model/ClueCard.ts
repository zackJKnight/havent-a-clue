import { Category } from "./Category"

export class ClueCard {
    Category: Category;
    Name: string;
    HeldBy: number;
    NotHeldBy: number[];
    SuggestedBy: [{
        playerId: number,
        inRound: number
    }];
    PossShownBy: [{
        playerId: number,
        inRound: number
    }];
    constructor(name: string, category: Category) {
        this.Category = category;
        this.Name = name;
        this.HeldBy = NaN;
        this.NotHeldBy = [];
        this.SuggestedBy = [{ playerId: NaN, inRound: NaN }];
        this.PossShownBy = [{ playerId: NaN, inRound: NaN }];
    }
}
