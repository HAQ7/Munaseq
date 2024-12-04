"use server";

export default async function getEventsAction() {
    try {
        const eventsRes = await fetch(`https://munaseq-backend-jrsyk.ondigitalocean.app//event/`, {
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
