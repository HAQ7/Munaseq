"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GetUserEventsAction() {
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    if (!token?.value) {
        redirect("signin");
    }

    try {
        const userEventsRes = await fetch(
            `${process.env.BACKEND_URL}/event/current`,
            {
                next: {
                    tags: ["event"],
                },
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                },
            }
        );

        return await userEventsRes.json();
    } catch (error: any) {
        return null;
    }
}
