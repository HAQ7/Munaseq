"use server";

export default async function getUserRating(userId: string) {
    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/user/rating/${userId}`,
            {
                next: {
                    tags: ["user"],
                },
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return null;
    }
}
