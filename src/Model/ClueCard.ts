import { Category } from "./Category.ts"

export class ClueCard {
    Category: Category;
    Name: string;
    HeldBy: number;
    NotHeldBy: number[];
    isSuggestion: boolean;
    SuggestedBy: [];
    PossShownBy: Record<number, number>;
    SeenBy: number[];
    BackgroundColor: string;
    isSolution: boolean;
    id: string;
    hints?: string[];

    constructor(name: string, category: Category, id: string) {
        this.Category = category;
        this.Name = name;
        this.HeldBy = NaN;
        this.NotHeldBy = [];
        this.isSuggestion = false;
        this.SuggestedBy = [];
        this.PossShownBy = {} as Record<number, number>;
        this.SeenBy = [];
        this.BackgroundColor = '';
        this.isSolution = false;
        this.id = id;
        this.hints = [];
    }
}
