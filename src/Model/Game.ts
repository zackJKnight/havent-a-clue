import { Possibility } from "../api/possibility";
import { ClueCard } from "./ClueCard";
import { Player } from "./Player";

export class Game {
    round: number;
    mainPlayerId: number;
    players: Player[];
    cards: ClueCard[];
    possibilities: Possibility[];
    constructor() {
        this.round = 0;
        this.mainPlayerId = 0;
        this.players = [];
        this.cards = [];
        this.possibilities = [];
    }
}