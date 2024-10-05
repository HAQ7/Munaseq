"use server";

export async function signinAction(formData: FormData) {
    const signinData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    try {
        const response = await fetch(`http://localhost:3000/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signinData),
        });

        const data = await response.json();
        const token = data.access_token;
        if (!token) {
            return null;
        }
        return token;
    } catch (error) {
        return null;
    }
}
