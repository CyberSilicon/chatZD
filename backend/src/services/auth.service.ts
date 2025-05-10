import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { IUser, User } from "../models/user.model";

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw { status: 401, message: "Veuillez fournir un email et un mot de passe." };
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 401, message: "Email ou mot de passe incorrect." };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Email ou mot de passe incorrect." };
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRES_IN }
  );

  return { user, token };
};


export const registerUser = async (userData: IUser) => {
  const existingEmail = await User.findOne({ email: userData.email });

  if (existingEmail) {
    const error: any = new Error("Adresse email déjà enregistrée");
    error.code = 11000;
    error.keyValue = { email: userData.email };
    throw error;
  }

  const newUser = new User(userData);
  await newUser.save();

  return newUser;
}
