"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function cancelEventAction(eventId: string) {
    const cookiesList = cookies();
    const token = cookiesList.get("token");

    try {
        const cancelRes = await fetch(
            `https://munaseq-backend-jrsyk.ondigitalocean.app//event/` + eventId,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                },
            }
        );

        const cancelResJson = await cancelRes.json();

        if (!cancelRes.ok) {
            console.log(cancelResJson);
            throw Error(cancelResJson.message);
        }

        revalidateTag("joined-events");
        revalidateTag("event");

        return cancelResJson;
    } catch (error: any) {
        const message = error.message;

        return { message };
    }
}
