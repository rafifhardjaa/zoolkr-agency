import { NextResponse, type NextRequest } from 'next/server'

function preferredLocale(request: NextRequest): 'en' | 'id' {
  const header = request.headers.get('accept-language')?.toLowerCase() ?? ''
  const first = header.split(',')[0]?.trim() ?? ''
  return first.startsWith('id') ? 'id' : 'en'
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale(request)}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/'],
}
