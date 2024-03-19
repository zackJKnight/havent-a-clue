import { Possibility } from "../api/possibility.ts";
import { ClueCard } from "./ClueCard.ts";
import { Player } from "./Player.ts";

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