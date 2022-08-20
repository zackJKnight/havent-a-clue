import { ClueCard } from "../Model/ClueCard";

export const getClueCardHints = (cards: ClueCard[]) => {

    const updatedCards = [...cards];
    updatedCards.forEach(card => {
        
    card.BackgroundColor = getClueCardBackgroundColor(card);
    });
    return updatedCards;
}

const getClueCardBackgroundColor = (card: ClueCard): string => {

    if (card === undefined) {
        return '';
    }

    if (card.isSolution) {
        return 'green';
    }

    if (!isNaN(card.HeldBy)) {
        // TODO color heldby per player
        return 'gray';
    }

    if (card.PossShownBy?.length === 0) {
        return '';
    }

    let gradientPercent = ((card.PossShownBy?.length || 0) / .1);
    const startGradientColor = '#fcf0c0';
    const endGradientColor = '#ffd321';
    return `linear-gradient(45deg, ${startGradientColor} ${100 - gradientPercent}%, ${endGradientColor} ${gradientPercent}%)`;
}