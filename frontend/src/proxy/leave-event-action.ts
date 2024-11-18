"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function leaveEventAction(eventId: string) {
    const cookiesList = cookies();
    const token = cookiesList.get("token");

    try {
        const leaveRes = await fetch("http://localhost:3002/event/leave", {
            method: "DELETE",
            body: JSON.stringify({ eventId }),
            headers: {
                Authorization: `Bearer ${token?.value}`,
                "Content-Type": "application/json",
            },
        });

        const leaveResJson = await leaveRes.json();

        if (!leaveRes.ok) {
            console.log(leaveResJson);
            throw Error(leaveResJson.message);
        }

        revalidateTag("joined-events");
        return leaveResJson;
    } catch (error: any) {
        const message = error.message;

        return { message };
    }
}
