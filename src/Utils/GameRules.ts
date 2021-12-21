import { ClueCard } from "../Model/ClueCard";

export default class GameRules {
    // when showing player isn't you
    // if two suggestions are known you to, you now know the remaining suggestion
    // if one suggestion is known to you, the other two are possibly shown.


    // if a card is notHeldby all players, it is a solution

    checkCategoriesForSolution = (updatedCards: Array<ClueCard>): Array<ClueCard> => {
        // if all other cards in the category are held, the remaining card is 
        // a known accusation/solution
        const categories = ['suspect', 'weapon', 'scene'];
        for (const category of categories) {
            let unheld = updatedCards.filter((card: ClueCard) => {
                card.Category === category &&
                    isNaN(card.HeldBy)
            });
            if (unheld.length === 1) {
                // I should test whether updating unheld is a reference and thus the map is unnecessary.
                updatedCards.forEach((updated: ClueCard) => {
                    if (updated.Name === unheld[0].Name) {
                        updated.isSolution = true;
                    }
                })
            }
        }
        return updatedCards;
    }
}