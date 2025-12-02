import { ClueCard } from "../Model/ClueCard.ts";

// Placeholder for future hint derivation. For now, rely on card.hints if present.
export const useCardHints = (card: ClueCard): string[] => {
  if (!card) return [];
  if (Array.isArray(card.hints) && card.hints.length > 0) {
    return card.hints;
  }
  return [];
};

export default useCardHints;
