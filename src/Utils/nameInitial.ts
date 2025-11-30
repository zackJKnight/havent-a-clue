export function getNameInitial(fullName?: string): string {
    if (!fullName) return '';
    const trimmed = fullName.trim();
    if (!trimmed) return '';
    // split on a single space and use the last token as the substantive name
    const parts = trimmed.split(' ');
    const last = parts[parts.length - 1];
    return last.charAt(0).toUpperCase();
}
