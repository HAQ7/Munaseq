"use server";

export default async function getUserAction(id: string) {
    try {
        const response = await fetch(`https://munaseq-backend-jrsyk.ondigitalocean.app//user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["user"],
            },
        });
        if (!response.ok) {
            throw Error("user not found");
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return undefined;
    }
}
