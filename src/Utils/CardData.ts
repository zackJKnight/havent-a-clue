import { Character } from "../api/character";
import { Scene } from "../api/scene";
import { Weapon } from "../api/weapon";

export const CardData = {
    "suspects": [
      {displayName: "homer", id: Character.green },
      {displayName: "bart", id: Character.plum },
      {displayName: "lisa", id: Character.scarlet },
      {displayName: "marge", id: Character.peacock},
      {displayName: "krusty", id: Character.mustard},
      {displayName: "smithers", id: Character.white},
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