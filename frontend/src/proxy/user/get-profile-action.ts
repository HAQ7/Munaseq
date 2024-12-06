'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getProfileAction() {
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    if (!token) {
        redirect("signin");
    }
    try {
        
        const response = await fetch(`${process.env.BACKEND_URL}/user/me`, {
            next: {
                tags: ['user']
            },
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token.value}`,
            },
        });
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        return null;
    }
}