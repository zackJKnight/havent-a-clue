import { Character } from "../api/character";
import { Scene } from "../api/scene";
import { Weapon } from "../api/weapon";

export const CardData = {
    "suspects": [
      {displayName: 'homer', labelName: "Mr. Green", id: Character.green, color: '#27632A', turn: 4 },
      {displayName: 'bart', labelName: "Prof. Plum", id: Character.plum, color: '#8E44AD', turn: 6 },
      {displayName: 'lisa', labelName: "Miss Scarlett", id: Character.scarlet, color: '#FF4136', turn: 1 },
      {displayName: 'marge', labelName: "Mrs. Peacock", id: Character.peacock, color: '#2ECC71', turn: 5 },
      {displayName: 'krusty', labelName: "Col Mustard", id: Character.mustard, color: '#F39C12', turn: 2 },
      {displayName: 'smithers', labelName: "Mrs. White", id: Character.white, color: '#FFFFFF', turn: 3 },
    ],
    "weapons": [
      {displayName: "glove", id: Weapon.candlestick },
      {displayName: "sax", id: Weapon.knife },
      {displayName: "necklace", id: Weapon.rope },
      {displayName: "donut", id: Weapon.leadPipe },
      {displayName: "plutonium", id: Weapon.wrench },
      {displayName: "slingshot", id: Weapon.revolver },
    ],
    "scenes": [
      {displayName: "studio", id: Scene.lounge },
      {displayName: "house", id: Scene.billiardRoom },
      {displayName: "manor", id: Scene.hall },
      {displayName: "kwiki", id: Scene.kitchen },
      {displayName: "retirement", id: Scene.conservatory },
      {displayName: "dutchman", id: Scene.library },
      {displayName: "nuke-plant", id: Scene.ballroom },
      {displayName: "dungeon", id: Scene.study },
      {displayName: "bowl-a-rama", id: Scene.diningRoom },
    ]
  }