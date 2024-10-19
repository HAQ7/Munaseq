export default async function getProfileAction(token: any) {
    try {
        
        const response = await fetch(`http://localhost:3002/user/me`, {
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