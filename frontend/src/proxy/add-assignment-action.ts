"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function addAssignmentAction(
    eventID: string,
    formData: FormData
) {
    // get token from cookie
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    // print all form keys 
    if (!token?.value) {
        redirect("signin");
    }

    //print all keys and values in the form
    for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
    }

    

    try {
        const createRes = await fetch(
            `${process.env.BACKEND_URL}/event/addAssignment/${eventID}`,
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                },
            }
        );

        if (!createRes.ok) {
            const errorResponse = await createRes.text(); // Capture the error message
            console.error("Error response:", errorResponse);
            throw Error(errorResponse);
        }

        revalidateTag("activity");
    } catch (error: any) {
        return {
            message: "ERROR",
        };
    }
}
