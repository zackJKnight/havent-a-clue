import { ClueCard } from "../Model/ClueCard.ts";
import { Player } from "../Model/Player.ts";

export const getCardBackgroundHints = (cards: ClueCard[], players: Player[]) => {
    const updatedCards = [...cards];
    updatedCards.forEach(card => {
        card.BackgroundColor = getCardBackgroundColor(card, players);
    });
    return updatedCards;
};

export const getCardBackgroundColor = (card: ClueCard, players: Player[]): string => {
    if (!card) return '';

    if (card.isSolution) {
        return 'green';
    }

    if (!isNaN(card.HeldBy)) {
        const playerColor = players.find(p => p.id === card.HeldBy)?.color ?? 'gray';
        if (playerColor === '#FFFFFF') {
            const startGradientColor = '#FFFFFF';
            const endGradientColor = '#000000';
            const gradientPercent = 10;
            return `linear-gradient(270deg, ${startGradientColor} ${100 - gradientPercent}%, ${endGradientColor} ${gradientPercent}%)`;
        }
        return playerColor;
    }

    if (!card.PossShownBy || Object.keys(card.PossShownBy).length === 0) {
        return '';
    }

    let total = 0;
    for (const k in card.PossShownBy) {
        total += card.PossShownBy[k as any] || 0;
    }

    const gradientPercent = ((total || 0) / .1);
    const startGradientColor = '#fcf0c0';
    const endGradientColor = '#ffd321';
    const degree = '45';
    return `linear-gradient(${degree}deg, ${startGradientColor} ${100 - gradientPercent}%, ${endGradientColor} ${gradientPercent}%)`;
};

export default getCardBackgroundHints;
