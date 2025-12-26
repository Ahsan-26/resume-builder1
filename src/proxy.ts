import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Matches: /en/admin-login, /fr/admin-login, /es/admin-login
  const isAdminLoginRoute = /^\/(en|fr|es)\/admin-login$/.test(pathname)

  if (isAdminLoginRoute) {
    const key = req.nextUrl.searchParams.get('key')

    if (key !== process.env.ADMIN_LOGIN_KEY) {
      // hard deny — no page render, no metadata leak
      return NextResponse.redirect(new URL('/404', req.url))
    }
  }

  // Continue normal next-intl routing
  return intlMiddleware(req)
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
