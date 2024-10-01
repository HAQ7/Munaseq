'use server';

export default async function editProfileAction(token: any , data:any) {
    

    const response = await fetch(`http://localhost:3000/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    console.log(responseJson);

    // return await response.json();
}

