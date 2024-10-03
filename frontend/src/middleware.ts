import { NextResponse, NextRequest } from "next/server";
import getProfileAction from "./proxy/get-profile-action";

export const config = {
    matcher: [
        "/discover",
        "/user/:username?",
        "/coordinated-events",
        "/joined-events",
        "/account",
        "/signin",
    ],
};

const authRequiredStaticPaths = new Set([
    "/discover",
    "/coordinated-events",
    "/joined-events",
    "/account"
]);

const checkAuth = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
        const { username } = await getProfileAction(token);
        if (!username) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-username", username);
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        console.error("Auth check failed:", error);
        return NextResponse.redirect(new URL("/signin", req.url));
    }
};

export async function middleware(req: NextRequest) {
    const pathname: string = req.nextUrl.pathname;

    if (authRequiredStaticPaths.has(pathname) || pathname.startsWith("/user/")) {
        return await checkAuth(req);
    }

    if (pathname === "/signin") {
        const token = req.cookies.get("token")?.value;
        if (token) {
            try {
                const { username } = await getProfileAction(token);
                if (username) {
                    // Avoid redirect loop by checking if user is already on /discover
                    if (req.nextUrl.pathname !== "/discover") {
                        return NextResponse.redirect(
                            new URL("/discover", req.url)
                        );
                    }
                }
            } catch (error) {
                console.error("Auth check failed on signin:", error);
            }
        }
    }

    return NextResponse.next();
}
