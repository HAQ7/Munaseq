"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function editProfileAction(
    formData: FormData,
    token: string
) {
    if ((formData.get("profilePicture") as File).size === 0) {
        formData.delete("profilePicture");
    }

    if ((formData.get("cv") as File).size === 0) {
        formData.delete("cv");
    }

    try {
        const editResponse = await fetch(`${process.env.BACKEND_URL}/user/`, {
            method: "PATCH",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!editResponse.ok) {
            const errorResponse = await editResponse.text(); // Capture the error message
            console.error("Error response:", errorResponse);
            throw Error(errorResponse);
        }

        revalidateTag("user");
        // create cookie and redirect to discover page
    } catch (error: any) {
        return {
            message: "ERROR",
        };
    }
    redirect("/account");
}
