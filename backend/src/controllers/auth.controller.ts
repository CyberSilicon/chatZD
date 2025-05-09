import { Request, Response } from 'express';
import { IUser, User } from '../models/user.model';
import { comparePassword, generateToken, hashPassword } from '../services/auth.service';

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
    const { username, email, password } = req.body as IUser;

    // Validation des champs
    if (!username || !email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters' });
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = generateToken({ userId: (newUser._id as string).toString(), email: newUser.email });

    //Réponse token et éventuellement l'user (sanctuarisé)
    res.status(201).json({
      message: 'User successfully created',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token // local storage ou l'envoyer dans un cookie httpOnly --> plus sécurisé mais pas accessible par le front, avoir !!
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({
      message: 'An internal error occurred',
      error: error.message,
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

    const isMatch = comparePassword(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Email ou mot de passe incorrect." });
      return;
    }

    // const token = jwt.sign({ id: user._id, email: user.email }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });
    const token = generateToken(user as any);
    res.status(200).json({ token, user });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};