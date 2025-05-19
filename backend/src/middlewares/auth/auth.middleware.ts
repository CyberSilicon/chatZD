// middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from '../../config/env';  // ta config .env

// On étend l’interface Request pour y ajouter la propriété `user`
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;      // Identifiant utilisateur extrait du JWT
    email: string;   // Email utilisateur extrait du JWT
  };
}

/**
 * Middleware qui protège les routes en vérifiant le JWT stocké dans le cookie `token`.
 *
 * - 401 si aucun token n’est fourni
 * - 500 si la clé secrète n’est pas configurée
 * - 403 si le token est invalide ou expiré
 * - Sinon, attache `req.user` et appelle `next()`
 */
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 1) Récupère le token HTTP-only depuis le cookie
  const token = req.cookies?.jwt;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized - No token provided' });
    return;
  }

  // 2) Vérifie que la clé secrète existe
  if (!ENV.JWT_SECRET) {
    console.error('[Auth] ERROR: JWT_SECRET is not defined');
    res.status(500).json({ message: 'Internal server error - Token secret missing' });
    return;
  }

  try {
    // 3) Vérifie et décode le JWT
    //    On attend dans le payload { id: string, email: string }
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload & {
      id: string;
      email: string;
    };

    // 4) Attache l’utilisateur décodé à la requête
    //    On sait que decoded.id et decoded.email existent car on les a signés au login
    (req as AuthenticatedRequest).user = {
      id: decoded.id,
      email: decoded.email,
    };

    // 5) Passe au middleware ou à la route suivante
    next();
  } catch (error) {
    // 6) Si le token est invalide ou expiré
    res.status(403).json({ message: 'Forbidden - Invalid or expired token' });
  }
};
