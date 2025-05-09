import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV } from '../config/env';

interface TokenPayload {
    userId: string;
    email: string;
  }
  
  const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });
  };
  

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (plain: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed);
};

export { generateToken, hashPassword, comparePassword };
