import { Game } from "../Model/Game.js";
import { ClueCard } from "../Model/ClueCard.js";

export type HistoryEntry = {
    type: 'show' | 'none' | 'a_card',
    suggestingPlayerId: number,
    showingPlayerId?: number,
    cardName?: string
}

export function applyHistoryEntry(game: Game, entry: HistoryEntry): Game {
    const g = { ...game } as Game;
    const tempCards: ClueCard[] = g.cards.map(c => ({ ...c } as ClueCard));

    if (entry.type === 'none') {
        // showingPlayer didn't show any card -> mark NotHeldBy for suggestion cards
        tempCards.forEach(card => {
            if (card.isSuggestion) {
                if (!card.NotHeldBy.includes(entry.suggestingPlayerId)) {
                    card.NotHeldBy.push(entry.suggestingPlayerId);
                }
                // ensure PossShownBy map exists
                if (!card.PossShownBy) card.PossShownBy = {} as Record<number, number>;
            }
        });
    } else if (entry.type === 'show' && entry.cardName && typeof entry.showingPlayerId === 'number') {
        // a specific card was shown
        tempCards.filter(c => c.Name === entry.cardName).forEach(card => {
            card.HeldBy = entry.showingPlayerId as number;
            card.isSuggestion = false;
        });
        // other suggestion cards should be cleared
        tempCards.forEach(card => { if (card.isSuggestion && card.Name !== entry.cardName) card.isSuggestion = false; });
    } else if (entry.type === 'a_card') {
        // showing player showed some card but we don't know which -> increment PossShownBy for remaining suggestions
        tempCards.forEach(card => {
            // increment counts regardless of isSuggestion to allow repeated history entries
            if (!card.PossShownBy) card.PossShownBy = {} as Record<number, number>;
            const id = entry.showingPlayerId as number;
            card.PossShownBy[id] = (card.PossShownBy[id] || 0) + 1;
        });
    }

    g.cards = tempCards;
    return g;
}

export default applyHistoryEntry;
