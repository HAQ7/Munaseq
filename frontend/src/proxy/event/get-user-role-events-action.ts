"use server";

import { UserDataDto } from "@/dtos/user-data.dto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getProfileAction from "../user/get-profile-action";

export default async function getUserRoleEvents() {
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    const { id }: UserDataDto = await getProfileAction();
    if (!token?.value) {
        redirect("signin");
    }

    try {
        const userEventsRes = await fetch(
            `${process.env.BACKEND_URL}/user/roles/${id}`,
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

        const userEvents: {
            createdEvents: { id: string }[],
            joinedEvents: { id: string }[],
            presentedEvents: { id: string }[],
            moderatedEvents: { id: string }[],
        } = await userEventsRes.json();

        return userEvents;

    } catch (error: any) {
        return null;
    }
}
