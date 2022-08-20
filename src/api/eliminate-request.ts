import { Possibility } from "./possibility";

export interface EliminateRequest {
    predicate: string[];
    possibilities: Possibility[];
}