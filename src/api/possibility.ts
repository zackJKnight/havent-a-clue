import { Character } from "./character.ts";
import { Scene } from "./scene.ts";
import { Weapon } from "./weapon.ts";

export interface Possibility {
    location: Scene;
    character: Character;
    weapon: Weapon;
}