import { Player } from "./Player";

export class Game {
    round: number;
    players: Player[];
    constructor() {
        this.round = 0;
        this.players = [];
    }
}