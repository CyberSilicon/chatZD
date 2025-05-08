import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser, User } from '../models/user.model';
import { ENV } from '../config/env';


/**
 * Handles the creation of a new user.
 *
 * This function extracts user data from the request body, creates a new
 * user instance, saves it to the database, and returns the created user
 * in the response. If an error occurs during the process, it sends a 400 status
 * code with an error message.
 *
 * @param req - The HTTP request object, containing the user data in the body.
 * @param res - The HTTP response object, used to send the response back to the client.
 * @returns A promise that resolves to void.
 *
 * @throws Will send a 400 status code with an error message if the user creation fails.
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
    res.status(201).json({
      status: 500,
      message: 'Une erreur interne est survenue'
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
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