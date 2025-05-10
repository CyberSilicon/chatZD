import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from '../../config/env';

export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

// Étend l’objet Request pour ajouter `user`
export interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

/**
 * Middleware to authenticate a JSON Web Token (JWT) from the request headers.
 *
 * - Checks for the 'Authorization' header.
 * - Validates the JWT.
 * - Attaches decoded payload to `req.user`.
 *
 * @throws 401 if no token is provided.
 * @throws 403 if the token is invalid or expired.
 */
// Contenu attendu du token JWT
export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

// Étend l’objet Request pour y ajouter le champ user
export interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

/**
 * Middleware pour authentifier une requête en vérifiant la présence
 * et la validité d'un JWT dans l’en-tête Authorization.
 *
 * Si le token est valide, le payload décodé est rattaché à `req.user`.
 * Sinon on renvoie une erreur HTTP appropriée.
 */
export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Récupère le header Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - Invalid Authorization header format' });
  }

  const token = authHeader.split(' ')[1];

  // Vérifie que le secret est bien défini
  if (!ENV.JWT_SECRET) {
    console.error('[Auth] JWT_SECRET is not defined in environment');
    return res
      .status(500)
      .json({ message: 'Internal server error - Misconfigured token secret' });
  }

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as DecodedToken;
    // Attache le payload décodé à la requête
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: 'Forbidden - Invalid or expired token' });
  }
};
