import { Player } from "./Player";

export class Game {
    round: number;
    mainPlayerId: number;
    players: Player[];
    constructor() {
        this.round = 0;
        this.mainPlayerId = 0;
        this.players = [];
    }
}