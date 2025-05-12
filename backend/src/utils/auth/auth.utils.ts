import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";


/**
 * Verifies if the provided input password matches the hashed password.
 *
 * @param inputPassword - The plain text password provided by the user.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to `true` if the passwords match, otherwise `false`.
 */
export const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};


/**
 * Generates a JSON Web Token (JWT) for the given payload.
 *
 * @param payload - An object containing the user's `id` and `email`.
 * @returns A signed JWT as a string.
 *
 * @throws Will throw an error if the signing process fails.
 *
 * @remarks
 * The token is signed using the secret key defined in `ENV.JWT_SECRET`
 * and will expire based on the duration specified in `ENV.JWT_EXPIRES_IN`.
 *
 * @example
 * ```typescript
 * const token = generateToken({ id: 123, email: "user@example.com" });
 * console.log(token); // Outputs a signed JWT string
 * ```
 */
import { Response } from "express";

export const generateToken = (payload: { id: any; email: string }, res: Response): string => {
  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV !== "dev",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  return token;
};





/**
 * Hashes a plain text password using bcrypt with a salt round of 10.
 *
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password as a string.
 */
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};