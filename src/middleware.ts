import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create response object early to handle both auth and non-auth routes
  const response = NextResponse.next();

  // Add security headers to all responses
  const headers = response.headers;
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.landmark-api.com;"
  );
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Frame-Options', 'DENY');
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // Check if the route requires authentication
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    try {
      const validateResponse = await fetch("https://api.landmark-api.com/user/api/v1/validate-token", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!validateResponse.ok) {
        throw new Error('Token validation failed')
      }

      // Add auth-specific headers for dashboard routes
      headers.set('X-Auth-Status', 'authenticated');
      
      return response;
    } catch (error) {
      // Clear auth cookie on validation failure
      const redirectResponse = NextResponse.redirect(new URL('/auth', request.url));
      redirectResponse.cookies.delete('auth_token');
      
      // Copy security headers to redirect response
      headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value);
      });
      
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Protect dashboard routes
    '/dashboard/:path*',
    
    // Apply security headers to all routes except specific static ones
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}