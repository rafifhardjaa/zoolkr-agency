import { NextResponse, type NextRequest } from 'next/server'
import { locales } from '@/lib/i18n'

function preferredLocale(request: NextRequest): 'en' | 'id' {
  const header = request.headers.get('accept-language')?.toLowerCase() ?? ''
  const first = header.split(',')[0]?.trim() ?? ''
  return first.startsWith('id') ? 'id' : 'en'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only redirect from root path
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${preferredLocale(request)}`
    return NextResponse.redirect(url)
  }
  
  // Check if pathname already has a valid locale prefix
  const pathnameParts = pathname.split('/').filter(Boolean)
  const firstSegment = pathnameParts[0]
  if (firstSegment && locales.includes(firstSegment as 'en' | 'id')) {
    // Already a localized path, let it through
    return NextResponse.next()
  }

  // Bypass public assets, API routes, and internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/cdn-cgi') ||
    pathname.startsWith('/videos') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // For other paths without locale, redirect to default locale
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - cdn-cgi (Cloudflare internal / cache)
     * - favicon.ico, robots.txt, sitemap.xml
     * - media, videos, images, fonts
     */
    '/((?!_next/static|_next/image|cdn-cgi|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|woff|woff2)$).*)',
  ],
}
