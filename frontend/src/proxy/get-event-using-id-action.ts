"use server";

export default async function getEventAction({ eventId }: { eventId: string }) {
    try {
        const eventsRes = await fetch(
            `https://munaseq-backend-jrsyk.ondigitalocean.app/event/` + eventId,
            {
                next: {
                    tags: ["event"],
                },
            }
        );

        const data = await eventsRes.json();

        return data;
    } catch (error: any) {
        return null;
    }
}
