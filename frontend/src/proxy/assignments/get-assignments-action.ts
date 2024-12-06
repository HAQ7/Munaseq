import { cookies } from "next/headers";

export default async function getAssignmentAction(eventID: string) {

    const cookieStore = cookies();
    const token = cookieStore.get("token");
    try {
        const materials = await fetch(
            `${process.env.BACKEND_URL}/event/assignments/${eventID}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token?.value}`,
                },
                next: {
                    tags: ["assignment"],
                },
            }
        );

        const data = await materials.json();

        return data.Assignments;
    } catch (error: any) {
        return [];
    }

}