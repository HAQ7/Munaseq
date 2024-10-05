"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signupAction(prevState: any, formData: FormData) {
    const signupData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        password: formData.get("password") as string,
    };

    try {
        const createResponse = await fetch(
            `http://localhost:3000/auth/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData),
            }
        );
        if (!createResponse.ok) {
            throw new Error(`HTTP error! status: ${createResponse.status}`);
        }

        const createResponseData = await createResponse.json();
        const token = createResponseData.access_token;

        const profileData = {
            visibleName: formData.get("displayName") as string,
            profilePicture: formData.get("profileImage") as string,
            gender: formData.get("gender") as string,
            categories: formData.getAll("tags") as string[],
        };

        const editResponse = await fetch(`http://localhost:3000/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });


        if (!editResponse.ok) {
            throw new Error(`HTTP error! status: ${editResponse.status}`);
        }

        const cookieStore = cookies();
        cookieStore.set("token", token, { maxAge: 259200, path: "/" });

        // create cookie and redirect to discover page
    } catch (error: any) {
        return {
            message:
                "حدث خطأ اثناء التسجيل الرجاء المحاولة مره اخرى في وقت لاحق",
        };
    }

    redirect("/discover");
}
