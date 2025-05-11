import { IUser, User } from "../models/user.model";
import { errorHandler } from "../utils/errors/errorHandler.util";
import { generateToken, verifyPassword } from "../utils/auth/auth.utils";

/**
 * Authenticates a user by verifying their email and password, and generates a token upon successful authentication.
 *
 * @param email - The email address of the user attempting to log in.
 * @param password - The password provided by the user for authentication.
 * @returns An object containing the authenticated user and a generated token.
 * @throws Will throw an error if the email is not found or the password does not match.
 */
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new errorHandler("Email ou mot de passe incorrect.", 401);
  }

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    throw new errorHandler("Email ou mot de passe incorrect.", 401);
  }

  const token = generateToken({ id: user._id, email: user.email });

  

  return { user, token };
};

/**
 * Registers a new user by creating a user instance and saving it to the database.
 *
 * @param userData - The data of the user to be registered, adhering to the `IUser` interface.
 * @returns A promise that resolves to the saved user document.
 */
export const registerUser = async (userData: IUser) => {
  const newUser = new User(userData);
  return await newUser.save();
};
