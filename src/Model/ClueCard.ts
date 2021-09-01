import { Category } from "./Category"

export class ClueCard {
    Category: Category;
    Name: string;
    HeldBy: number;
    NotHeldBy: number[];
    isSuggestion: boolean;
    SuggestedBy: [];
    PossShownBy: number[];
    constructor(name: string, category: Category) {
        this.Category = category;
        this.Name = name;
        this.HeldBy = NaN;
        this.NotHeldBy = [];
        this.isSuggestion = false;
        this.SuggestedBy = [];
        this.PossShownBy = [];
    }
}
