export function getDate(date) {
    date = new Date(date)
    date = date.toLocaleString()
    return date.split(", ")
}

export function dateDist(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    const difference = date1.getTime() - date2.getTime()
    if (difference < 0) return undefined;
    else {
        return difference / (1000 * 3600 * 24)
    }
}