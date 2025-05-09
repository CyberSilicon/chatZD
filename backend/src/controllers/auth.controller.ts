import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser, User } from '../models/user.model';
import { ENV } from '../config/env';

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
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: IUser = req.body;
    const newUser = new User(userData);

    await newUser.save();
    res.status(201).json({
      status: 201,
      message: 'Utilisateur créé avec succès',
      user: newUser
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(422).json({
        status: 422,
        message: 'Erreur de validation, veuillez vérifier les données fournies',
        errors: error.errors,
      });
    } else if (error.code === 11000) {
      const key = Object.keys(error.keyValue)[0];
      const message = key === 'email' ? 'Adresse email déjà enregistrée' : 'Username déjà enregistré';
      res.status(409).json({
        status: 409,
        message: message,
        code: error.code
      });
    }
     else {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: 'Erreur interne du serveur',
        error: error.message,
      });
    }
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

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Email ou mot de passe incorrect." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Email ou mot de passe incorrect." });
      return;
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token, user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};