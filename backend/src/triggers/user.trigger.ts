import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Profile } from '../models/profile.model';

/**
 * Validates the email format of the current object.
 * 
 * This function uses a regular expression to check if the email property
 * of the current object (`this.email`) is in a valid format. If the email
 * is invalid, it passes an error to the `next` callback. Otherwise, it 
 * calls the `next` callback without any arguments.
 * 
 * @param next - The callback function to be called after validation.
 */
const validateEmail = function (this: any, next: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    return next(new Error('Adresse email invalide'));
  }
  next();
};

/**
 * Middleware function to hash the user's password before saving it to the database.
 * This function should be used as a pre-save hook in a Mongoose schema.
 *
 * @param {function} next - The next middleware function in the stack.
 * @this {any} - The context object, typically a Mongoose document.
 * 
 * @returns {Promise<void>} - A promise that resolves when the password has been hashed and the next middleware is called.
 *
 * @throws {Error} - Throws an error if hashing the password fails.
 */
const hashPassword = async function (this: any, next: any) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware function to handle the deletion of a user profile when a user is deleted.
 * 
 * This function is intended to be used as a pre-delete hook in a Mongoose schema.
 * It retrieves the user ID from the query filter and deletes the associated profile.
 * 
 * @param {any} this - The context in which the middleware is executed, typically a Mongoose query.
 * @param {Function} next - The next middleware function in the stack.
 * 
 * @throws {Error} If an error occurs during the profile deletion process.
 */
const handleUserProfileDeletion = async function (this: any, next: any) {
  try {
    const filter = this.getQuery();
    if (filter._id) {
      await Profile.findOneAndDelete({ user_id: filter._id });
    }
    next();
  } catch (error) {
    next(error as Error);
  }
};

/**
 * Applies hooks to the user schema.
 *
 * This function adds pre-save and pre-delete hooks to the provided schema.
 * - `validateEmail`: Validates the email before saving the document.
 * - `hashPassword`: Hashes the user's password before saving the document.
 * - `handleUserProfileDeletion`: Handles user profile deletion before deleting the document.
 *
 * @param schema - The Mongoose schema to which the hooks will be applied.
 */
export const applyUserHooks = (schema: Schema) => {
  schema.pre('save', validateEmail);
  schema.pre('save', hashPassword);
  schema.pre('findOneAndDelete', handleUserProfileDeletion);
};
