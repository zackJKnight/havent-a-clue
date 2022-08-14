import { ClueCard } from "./ClueCard";
import { Player } from "./Player";

export class Game {
    round: number;
    mainPlayerId: number;
    players: Player[];
    cards: ClueCard[];
    constructor() {
        this.round = 0;
        this.mainPlayerId = 0;
        this.players = [];
        this.cards = [];
    }
}