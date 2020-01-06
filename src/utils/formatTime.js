export function getDate(date) {
    date = new Date(date)
    date = date.toLocaleString()
    return date.split(", ")
}