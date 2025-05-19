import { IUser, User } from "../models/user.model";
import { errorHandler } from "../utils/errors/errorHandler.util";
import { generateToken, verifyPassword } from "../utils/auth/auth.utils";
import { Response } from "express";
import { createSession } from "./session.service";
import { ENV } from "../config/env";

/**
 * Authenticates a user by verifying their email and password, and generates a token upon successful authentication.
 *
 * @param email - The email address of the user attempting to log in.
 * @param password - The password provided by the user for authentication.
 * @returns An object containing the authenticated user and a generated token.
 * @throws Will throw an error if the email is not found or the password does not match.
 */
export const loginUser = async (email: string, password: string, response: Response) => {

  const user = await User.findOne({ email });
  if (!user) {
    throw new errorHandler("Email ou mot de passe incorrect.", 401);
  }

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    throw new errorHandler("Email ou mot de passe incorrect.", 401);
  }

  const token = generateToken({ id: user._id, email: user.email}, response);

  const session = await createSession({
    userId: (user._id as string | { toString(): string }).toString(),
    ipAddress: response.req.ip || "Unknown",
    deviceInfo: response.req.headers["user-agent"] || "Unknown",
  });

  response.cookie("user_session_id", session.sessionId, {
    httpOnly: true,
    secure: ENV.NODE_ENV !== "dev",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }).json({
    message: "Login successful, Session started...",
    user: {
      id: user._id,
      email: user.email,
      // role: user.role,
    },
  });

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
