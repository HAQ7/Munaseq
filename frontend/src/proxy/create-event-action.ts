"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function createEventAction(formData: FormData) {
    // get token from cookie
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    if (!token?.value) {
        redirect("signin");
    }

    try {
        const createRes = await fetch("http://localhost:3002/event", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });


        if (!createRes.ok) {
            const errorResponse = await createRes.text(); // Capture the error message
            console.error("Error response:", errorResponse);
            throw Error(errorResponse);
        }

        revalidateTag("event");
    } catch (error: any) {
        return {
            message: "ERROR",
        };
    }
    redirect("coordinated-events/upcoming");
}
