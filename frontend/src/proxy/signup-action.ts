"use server";

import editProfileAction from "./edit-profile-action";

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

    const data = await response.json();
    const token = data.access_token;

    const profileData = {
        visibleName: formData.get("displayName") as string,
        profilePicture: formData.get("profileImage") as string,
        gender: formData.get("gender") as string,
        categories: formData.getAll("tags") as string[],
    };

    await editProfileAction(token, profileData);

    return token;
}
