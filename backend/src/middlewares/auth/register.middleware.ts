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

    // Validation du corps de la requête
    if (!email || !password || !username) {
        throw new errorHandler("Tous les champs (email, username, password) sont requis.", 400);
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new errorHandler("Format d'email invalide.", 400);
    }

    // Validation du nom d'utilisateur
    if (username.length < 3 || username.length > 32) {
        throw new errorHandler("Le nom d'utilisateur doit contenir entre 3 et 32 caractères.", 400);
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        throw new errorHandler("Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores.", 400);
    }

    // Validation du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new errorHandler("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.", 400);
    }

    next();
};