export function checkData(startDate: string, endDate: string) {
    function setToMidnight(date: Date) {
        return new Date(date.setHours(0, 0, 0, 0));
    }

    const today = setToMidnight(new Date());
    const start = setToMidnight(new Date(startDate));
    const end = setToMidnight(new Date(endDate));

    if (start <= today && end >= today) {
        return "active";
    } else if (end < today) {
        return "past";
    } else if (start > today) {
        return "upcoming";
    }

    // This should never happen if dates are valid, but including for completeness
    return "unknown";
}
