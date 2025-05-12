import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware principal
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Si l'utilisateur est connecté, rediriger hors des pages de login/register
  if (token && (pathname === '/register' || pathname === '/login')) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à une page protégée
  if (!token && pathname.startsWith('/')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Autoriser la requête si aucune condition n'est remplie
  return NextResponse.next();
}

// Configuration du middleware pour matcher certaines routes
export const config = {
  matcher: ['/dashboard/:path*', '/register', '/login'],
};
