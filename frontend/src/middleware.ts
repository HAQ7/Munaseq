import { NextResponse, NextRequest } from 'next/server';
import getProfileAction from './proxy/get-profile-action';

const pathsNeedingAuth: string[] = [
  '/discover',
  '/:username',
  '/coordinated-events',
  '/joined-events',
  '/account',
];

export async function middleware(req: NextRequest) {
  const pathname: string = req.nextUrl.pathname;

  for (const path of pathsNeedingAuth) {
    if (pathname.startsWith(path)) {
      const token = req.cookies.get('token');

      if (!token) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }

      const { username }: { username: string } = await getProfileAction(
        token.value
      );

      if (!username) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }

      console.log('authed !!')

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('username', username);

      const response = NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });

      return response;
    }
  }
  if (req.nextUrl.pathname.startsWith('/signin')) {
    const token = req.cookies.get('token');

    if (token) {
      const { username } = await getProfileAction(token.value);
      if (username) {
        return NextResponse.redirect(new URL('/discover', req.url));
      }
    }

    return NextResponse.next();
  }
}

const allPaths = [...pathsNeedingAuth, 'signin']

export const config = {
  matcher: allPaths,
};
