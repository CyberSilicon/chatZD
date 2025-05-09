import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

interface DecodedToken {
  id: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

/**
 * Middleware to authenticate a JSON Web Token (JWT) from the request headers.
 * 
 * This middleware checks for the presence of an 'Authorization' header in the request.
 * If the header is present, it extracts the token and verifies it using the secret key.
 * If the token is valid, the decoded token is attached to the request object as `req.user`.
 * If the token is missing or invalid, an appropriate error response is sent.
 * 
 * @param req - The incoming request object, extended to include an optional `user` property.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * 
 * @throws {401} If no token is provided in the 'Authorization' header.
 * @throws {400} If the provided token is invalid.
 */
export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized - No Token Provided ' });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Unauthorized - Invalid Token' });
  }
};
