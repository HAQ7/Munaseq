"use server";

export default async function getEventAction({ eventId }: { eventId: string }) {
    try {
        const eventsRes = await fetch(
            `${process.env.BACKEND_URL}/event/` + eventId,
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
