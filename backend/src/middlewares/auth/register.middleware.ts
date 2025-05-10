import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/errors/errorHandler.util";

/**
 * Middleware to validate the registration request.
 * Ensures that the email, username, and password provided in the request body meet the required criteria.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 *
 * @throws Will pass an error to the next middleware if the email or password is missing,
 *         if the username is invalid, or if the password does not meet the complexity requirements.
 */
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;

    if (!email || !password) {
        throw new errorHandler("Veuillez fournir un email et un mot de passe.", 400);
    }
    if (!username || username.length < 3) {
        throw new errorHandler("Le nom d'utilisateur doit contenir au moins 3 caractères.", 400);
    }
    if (!password || password.length < 6) {
        throw new errorHandler("Le mot de passe doit contenir au moins 6 caractères.", 400);
    }

    next();
};