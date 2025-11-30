import migratePossShownBy from '../Utils/migrations.js';
import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';

describe('migratePossShownBy', () => {
  it('converts numeric arrays into count maps', () => {
    const g = new Game();
    const c = new ClueCard('One', 'suspect', 's1');
    (c as any).PossShownBy = [1,2,2,3];
    g.cards = [c];
    const migrated = migratePossShownBy(g);
    expect(migrated.cards[0].PossShownBy[1]).toBe(1);
    expect(migrated.cards[0].PossShownBy[2]).toBe(2);
    expect(migrated.cards[0].PossShownBy[3]).toBe(1);
  });

  it('ignores non-number entries and creates empty map when undefined', () => {
    const g = new Game();
    const c = new ClueCard('Two', 'weapon', 'w1');
    (c as any).PossShownBy = [1,'x',null] as any;
    g.cards = [c];
    const migrated = migratePossShownBy(g);
    expect(migrated.cards[0].PossShownBy[1]).toBe(1);
    expect(Object.keys(migrated.cards[0].PossShownBy).length).toBeGreaterThanOrEqual(1);
  });
});
