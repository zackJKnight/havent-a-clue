import { ClueCard } from "../Model/ClueCard";
import { Player } from "../Model/Player";

export const getClueCardHints = (cards: ClueCard[], players: Player[]) => {

    const updatedCards = [...cards];
    updatedCards.forEach(card => {
    card.BackgroundColor = getClueCardBackgroundColor(card, players);
    });
    return updatedCards;
}

const getClueCardBackgroundColor = (card: ClueCard, players: Player[]): string => {

    if (card === undefined) {
        return '';
    }

    if (card.isSolution) {
        return 'green';
    }

    if (!isNaN(card.HeldBy)) {
        // TODO color heldby per player
        return players.find(p => p.id === card.HeldBy)?.color ?? 'gray';
    }

    if (card.PossShownBy?.length === 0) {
        return '';
    }

    let gradientPercent = ((card.PossShownBy?.length || 0) / .1);
    const startGradientColor = '#fcf0c0';
    const endGradientColor = '#ffd321';
    return `linear-gradient(45deg, ${startGradientColor} ${100 - gradientPercent}%, ${endGradientColor} ${gradientPercent}%)`;
}