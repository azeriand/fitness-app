import dayjs from "dayjs";

export function getCurrentDateTime() {
    return dayjs().format('DD/MM/YYYY HH:mm')
}