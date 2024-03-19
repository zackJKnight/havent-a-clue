import { Possibility } from "./possibility.ts";

export interface EliminateRequest {
    predicate: string[];
    possibilities: Possibility[];
}