import { NextResponse, NextRequest } from "next/server";
import getProfileAction from "./proxy/get-profile-action";
import isInEventAction from "./proxy/is-in-event-action";

export const config = {
    matcher: [
        "/discover",
        "/user/:username?",
        "/coordinated-events/active",
        "/coordinated-events/past",
        "/coordinated-events/upcoming",
        "/joined-events/active",
        "/joined-events/past",
        "/joined-events/upcoming",
        "/account",
        "/signin",
        "/account/edit",
        "/create-event",
        "/event/:eventId*",
    ],
};

const authRequiredStaticPaths = new Set([
    "/discover",
    "/coordinated-events/active",
    "/coordinated-events/past",
    "/coordinated-events/upcoming",
    "/joined-events/active",
    "/joined-events/past",
    "/joined-events/upcoming",
    "/account",
    "/account/edit",
    "/create-event",
]);

// const authRequiredDynamicPaths = ["/user/", "/event/"];

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

const isInEvent = async (req: NextRequest, eventId: string) => {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
        const { username } = await getProfileAction(token);
        if (!username) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        if (await isInEventAction(eventId, username)) {
            const requestHeaders = new Headers(req.headers);
            requestHeaders.set("x-username", username);
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        }

        return NextResponse.redirect(new URL("/discover", req.url));
    } catch (error) {
        console.error("Auth check failed:", error);
        return NextResponse.redirect(new URL("/signin", req.url));
    }
};

export async function middleware(req: NextRequest) {
    const pathname: string = req.nextUrl.pathname;

    if (
        authRequiredStaticPaths.has(pathname) ||
        pathname.startsWith("/user/")
    ) {
        return await checkAuth(req);
    }

    if (pathname.startsWith("/event/")) {
        const eventId = pathname.split("/")[2];

        if (eventId && pathname.split("/").length >= 4) {
            // Check if user is in event
            console.log("checking if user is in event");
            return await isInEvent(req, eventId);
        }
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
