"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function joinEventAction(eventId: string) {
    console.log(eventId);
    const cookiesList = cookies();
    const token = cookiesList.get("token");

    try {
        const joinRes = await fetch("http://localhost:3002/event/join", {
            method: "POST",
            body: JSON.stringify({ eventId }),
            headers: {
                Authorization: `Bearer ${token?.value}`,
                "Content-Type": "application/json",
            },
        });

        const joinResJson = await joinRes.json();

        if (!joinRes.ok) {
            console.log(joinResJson);
            throw Error(joinResJson.message);
        }

        revalidateTag("joined-events");
        return joinResJson;
    } catch (error: any) {
        const message = error.message;
        switch (message) {
            case "User gender does not match the event's accepted gender":
                return {
                    error: "GENDER",
                };
            case "User already joined this event":
                return {
                    error: "JOINED",
                };
            default:
                return {
                    error: "ERROR",
                };
        }
    }
}
