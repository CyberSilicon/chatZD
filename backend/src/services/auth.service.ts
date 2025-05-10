import { IUser, User } from "../models/user.model";
import { errorHandler } from "../utils/errors/errorHandler.util";
import { generateToken, verifyPassword } from "../utils/auth/auth.utils";

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

export const registerUser = async (userData: IUser) => {
  const newUser = new User(userData);
  return await newUser.save();
};
