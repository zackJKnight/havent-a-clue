import { useMemo } from "react";
import { ClueCard } from "../Model/ClueCard.ts";
import { Game } from "../Model/Game.ts";
import { deriveHints } from "../Utils/hints.ts";

export const useCardHints = (card: ClueCard, game?: Game): string[] => {
    return useMemo(() => {
        if (!card || !game) return card?.hints || [];
        return deriveHints(card, game);
    }, [card, game]);
};

export default useCardHints;
