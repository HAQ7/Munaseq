'use server';

export default async function getUserAction(id: string) {
    try {
        const response = await fetch(`http://localhost:3002/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw Error('user not found')
        }
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        return undefined;
    }
}

