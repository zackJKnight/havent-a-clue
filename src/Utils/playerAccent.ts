export function getAccentColor(bgColor?: string): string {
    if (!bgColor) return '#fff';
    const normalized = bgColor.trim().toLowerCase();
    // explicit overrides for known player colors
    const overrides: Record<string, string> = {
        '#ffffff': '#000000', // white -> black
        'white': '#000000',
        '#fff': '#000000',
        '#ffd321': '#000000', // mustard is light, use black
        '#ffd': '#000000'
    };
    if (overrides[normalized]) return overrides[normalized];

    // Helper: parse hex color into r,g,b (0-255). Accepts #rgb or #rrggbb
    function hexToRgb(hexStr: string): [number,number,number] | null {
        const h = hexStr.replace('#','');
        if (h.length === 3) {
            const r = parseInt(h[0]+h[0], 16);
            const g = parseInt(h[1]+h[1], 16);
            const b = parseInt(h[2]+h[2], 16);
            return [r,g,b];
        }
        if (h.length === 6) {
            const r = parseInt(h.substring(0,2), 16);
            const g = parseInt(h.substring(2,4), 16);
            const b = parseInt(h.substring(4,6), 16);
            return [r,g,b];
        }
        return null;
    }

    const rgb = hexToRgb(normalized);
    if (!rgb) {
        // fallback: prefer black for unknown strings
        return '#000000';
    }

    // convert sRGB to linearized value
    function lin(c: number) {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    }
    const [r,g,b] = rgb;
    const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

    // relative luminance for white is 1, for black is 0
    const contrastWithWhite = (1.0 + 0.05) / (L + 0.05);
    const contrastWithBlack = (L + 0.05) / (0.0 + 0.05);

    // choose the color (black or white) with better contrast ratio
    return contrastWithBlack >= contrastWithWhite ? '#000000' : '#ffffff';
}
