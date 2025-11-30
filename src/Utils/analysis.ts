import { Game } from "../Model/Game.js";

// Compute a simple likelihood score for each card being the solution.
// Heuristic rules:
// - If card.isSolution === true => score 1
// - If card.HeldBy is known => score 0
// - Start with uniform prior per category, then decrement by evidence:
//    * Each NotHeldBy entry reduces the number of players who could hold it (increases likelihood)
//    * Each PossShownBy count reduces likelihood proportionally (others may have shown it)

export function computeSolutionLikelihood(game: Game): Record<string, number> {
    const cards = game.cards;
    const playersCount = game.players.length || 1;

    // group by category to create uniform priors per category
    const categories: Record<string, string[]> = {};
    for (const c of cards) {
        categories[c.Category] = categories[c.Category] || [];
        categories[c.Category].push(c.Name);
    }

    const scores: Record<string, number> = {};

    for (const c of cards) {
        if (c.isSolution) {
            scores[c.Name] = 1;
            continue;
        }
        // treat a card as held if HeldBy references a valid player id (coerce strings)
        const heldBy = Number((c as any).HeldBy);
        if (Number.isFinite(heldBy) && !isNaN(heldBy) && game.players[heldBy]) {
            scores[c.Name] = 0;
            continue;
        }

        // base prior: 1 / number of cards in that category
        const base = 1 / (categories[c.Category]?.length || 1);

        // NotHeldBy increases likelihood: fraction of players who do NOT have the card
        const notHeldCount = (c.NotHeldBy || []).length;
        const notHeldFactor = notHeldCount / playersCount; // more not-held -> higher likelihood

        // PossShownBy reduces likelihood: the total times players might have shown it
        let possTotal = 0;
        if (c.PossShownBy) {
            for (const k in c.PossShownBy) {
                possTotal += c.PossShownBy[k] || 0;
            }
        }
        const possPenalty = Math.min(possTotal / Math.max(1, playersCount), 1);

        // Combine: start from base, add notHeld evidence, subtract poss evidence
        let score = base + (notHeldFactor * 0.5) - (possPenalty * 0.5);
        // clamp
        score = Math.max(0, Math.min(1, score));
        scores[c.Name] = score;
    }

    return scores;
}

export default computeSolutionLikelihood;
