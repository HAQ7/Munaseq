"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function addMateiralAction(
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

    

    try {
        const createRes = await fetch(
            `https://munaseq-backend-jrsyk.ondigitalocean.app//event/addMaterial/${eventID}`,
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

        revalidateTag("material");
    } catch (error: any) {
        return {
            message: "ERROR",
        };
    }
}
