import { ClueCard } from "../Model/ClueCard";

export default class GameRules {

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