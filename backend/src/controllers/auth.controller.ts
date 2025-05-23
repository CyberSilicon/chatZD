import { NextFunction, Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { sendError, sendSuccess } from '../utils/authResponse.util';

/**
 * Handles user registration by creating a new user in the database.
 *
 * @param req - The HTTP request object, containing the user data in the body.
 * @param res - The HTTP response object used to send the response.
 * @returns A Promise that resolves to void.
 *
 * @throws {ValidationError} If the provided user data fails validation.
 * @throws {MongoError} If a duplicate key error occurs (e.g., email or username already exists).
 * @throws {Error} For any other internal server errors.
 *
 * HTTP Responses:
 * - 201: User successfully created. Returns the created user object.
 * - 422: Validation error. Returns the validation error details.
 * - 409: Conflict error. Indicates duplicate email or username.
 * - 500: Internal server error. Returns the error message.
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user: any = await registerUser(req.body);
    sendSuccess(res, { user }, "Utilisateur créé avec succès", 201);
  } catch (error) {
    sendError(res, error);
  }
};



/**
 * Handles user login by verifying email and password, and returns a JWT token if successful.
 *
 * @param req - The request object containing the email and password in the body.
 * @param res - The response object used to send back the appropriate HTTP response.
 * @returns A Promise that resolves to void.
 *
 * @throws {Error} If there is an issue with the login process, a 500 status code and error message are returned.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    sendSuccess(res, { token, user }, "Connexion réussie");
  } catch (error) {
    sendError(res, error);
  }
};
