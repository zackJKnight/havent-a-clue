import { Character } from "./character";
import { Scene } from "./scene";
import { Weapon } from "./weapon";

export interface Possibility {
    location: Scene;
    character: Character;
    weapon: Weapon;
}