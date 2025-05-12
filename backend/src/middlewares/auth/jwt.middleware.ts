import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from '../../config/env';

export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): any => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  if (!ENV.JWT_SECRET) {
    console.error('[Auth] ERROR: J_S is not defined in environment');
    return res.status(500).json({ message: 'Internal server error - TSoken secret missing' });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden - Invalid or expired token' });
  }
};