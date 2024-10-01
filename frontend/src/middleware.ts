import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith("/discover")) {
        const token = req.cookies.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        return NextResponse.next();
    }
    if (req.nextUrl.pathname.startsWith("/signin")) {
        const token = req.cookies.get("token");

        if (token) {
            return NextResponse.redirect(new URL("/discover", req.url));
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/discover", "/signin"],
};