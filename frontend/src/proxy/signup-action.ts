"use server";

import fileToBase64 from "@/util/file-base64";
import editProfileAction from "./editProfile-action";

export async function signupAction(formData: FormData) {
    const signupData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        password: formData.get("password") as string,
    };

    const response = await fetch(`http://localhost:3000/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
    });

    const token = await response.json();
    // TO CHANGE TO BASE64 IN FRONT END ----------------------------------------------------------------------
    const base64String: any = fileToBase64(
        formData.get("profileImage") as File
    );
    const base64Data = base64String.split(",")[1];

    const profileData = {
        visibleName: formData.get("displayName") as string,
        profilePicture: base64Data,
        gender: formData.get("gender") as string,
        categories: formData.getAll("tags") as string[],
    };

    await editProfileAction(token, profileData);

    return token;
}
