"use server";

export default async function getEventsAction() {
    try {
        const eventsRes = await fetch(`${process.env.BACKEND_URL}/event/`, {
            next: {
                tags: ["event"],
            },
        });

        const data = await eventsRes.json();

        return data;
    } catch (error: any) {
        return null;
    }
}
