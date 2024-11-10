export default function GetDate(date: string) {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}