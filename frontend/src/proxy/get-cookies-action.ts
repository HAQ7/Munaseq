"use server";

import { cookies } from "next/headers";
export const getToken = async () => {
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    return token;
};
