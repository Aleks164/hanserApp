export function getNextDayDate(date: string) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    return new Date(year, month, day + 1);
}
