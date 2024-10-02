import { NextResponse, NextRequest } from "next/server";
import getProfileAction from "./proxy/get-profile-action";

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/discover")) {
        const token = req.cookies.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        const { username } = await getProfileAction(token.value);

        if (!username) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith("/signin")) {
        const token = req.cookies.get("token");

        if (token) {
            const { username } = await getProfileAction(token.value);
            if (username) {
                return NextResponse.redirect(new URL("/discover", req.url));
            }
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/discover", "/signin"],
};
