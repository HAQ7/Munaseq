'use server'

export default async function getProfileAction(token: any) {
    try {
        
        const response = await fetch(`https://munaseq-backend-jrsyk.ondigitalocean.app/user/me`, {
            next: {
                tags: ['user']
            },
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        return null;
    }
}