import { ClueCard } from "../Model/ClueCard.ts";
import { Player } from "../Model/Player.ts";

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
        const playerColor = players.find(p => p.id === card.HeldBy)?.color ?? 'gray';
        if (playerColor === '#FFFFFF') {
            const startGradientColor = '#FFFFFF';
    const endGradientColor = '#000000';
    const gradientPercent = 10;
            return `linear-gradient(270deg, ${startGradientColor} ${100 - gradientPercent}%, ${endGradientColor} ${gradientPercent}%)`;
        }
        return playerColor;
    }

    if (card.PossShownBy?.length === 0) {
        return '';
    }

    let gradientPercent = ((card.PossShownBy?.length || 0) / .1);
    const startGradientColor = '#fcf0c0';
    const endGradientColor = '#ffd321';
    let degree = '45';
    return `linear-gradient(${degree}deg, ${startGradientColor} ${100 - gradientPercent}%, ${endGradientColor} ${gradientPercent}%)`;
}