import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/errors/errorHandler.util";

/**
 * Middleware to validate the login request body.
 * Ensures that both `email` and `password` fields are provided in the request body.
 * If either field is missing, an error is thrown with a 401 status code.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 *
 * @throws {errorHandler} If `email` or `password` is not provided in the request body.
 */
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new errorHandler("Veuillez fournir un email et un mot de passe.", 401);
    }

    next();
};