export function getNextDayDate(date: string) {
    const toDateInDateFormat = new Date(date);
    return new Date(toDateInDateFormat.setDate(toDateInDateFormat.getDate() + 1));
}
