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

    // if hex color provided, compute luminance
    const hex = normalized.replace('#', '');
    if (hex.length === 3) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        const lum = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
        return lum > 0.6 ? '#000000' : '#ffffff';
    }
    if (hex.length === 6) {
        const r = parseInt(hex.substring(0,2), 16);
        const g = parseInt(hex.substring(2,4), 16);
        const b = parseInt(hex.substring(4,6), 16);
        const lum = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
        return lum > 0.6 ? '#000000' : '#ffffff';
    }

    // fallback: white
    return '#ffffff';
}
