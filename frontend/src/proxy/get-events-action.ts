"use server";

export default async function getEventsAction() {
    try {
        const eventsRes = await fetch("http://localhost:3002/event/", {
            next: {
                tags: ["event"],
            },
        });

        const data = await eventsRes.json();
        console.log(data);

        return data;
    } catch (error: any) {
        return null;
    }
}
