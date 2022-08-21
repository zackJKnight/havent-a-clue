import { Character } from "../api/character";
import { Scene } from "../api/scene";
import { Weapon } from "../api/weapon";

export const CardData = {
    "suspects": [
      {displayName: "homer", id: Character.green, color: '#27632A' },
      {displayName: "bart", id: Character.plum, color: '#8E44AD' },
      {displayName: "lisa", id: Character.scarlet, color: '#FF4136' },
      {displayName: "marge", id: Character.peacock, color: '#2ECC71' },
      {displayName: "krusty", id: Character.mustard, color: '#F39C12' },
      {displayName: "smithers", id: Character.white, color: '#FFFFFF' },
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