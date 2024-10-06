'use server';

export default async function isEmailUniqueAction(email: string) {
    try {
        throw new Error("ERROR");
        const response = await fetch(
            `http://localhost:3000/user/email/${email}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            throw new Error("EMAIL_NOT_UNIQUE");
        }

        if (response.status !== 404 && !response.ok) {
            throw new Error("ERROR");
        }



        return { passed: true, error: "" };
    } catch (error: any) {
        return { passed: false, error: error.message };
    }
}
