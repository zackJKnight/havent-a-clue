import { getNameInitial } from '../Utils/nameInitial.js';

describe('getNameInitial', () => {
  it('returns initial of last token', () => {
    expect(getNameInitial('Col Mustard')).toBe('M');
    expect(getNameInitial('Miss Scarlett')).toBe('S');
    expect(getNameInitial('Homer')).toBe('H');
  });
 });
