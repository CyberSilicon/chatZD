import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Profile } from '../models/profile.model';
import { errorHandler } from '../utils/errors/errorHandler.util';

/**
 * Validates the email format of the current context (`this`) using a regular expression.
 * If the email is invalid, it passes an error to the `next` callback.
 * Otherwise, it proceeds to the next middleware or function.
 *
 * @param next - The callback function to proceed to the next middleware or handle an error.
 * @throws {Error} If the email format is invalid.
 */
export const validateEmail = function (this: any, next: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    return next(new errorHandler('Adresse email invalide.', 400));
  }
  next();
};

/**
 * Validates the `username` property of the current context (`this`) to ensure it only contains
 * letters, numbers, and underscores. If the validation fails, an error is passed to the `next` callback.
 *
 * @param next - The callback function to proceed to the next middleware or handle an error.
 *
 * @throws {Error} If the `username` is invalid, an error is passed to the `next` callback with a message
 * indicating the allowed characters.
 */
export const validateUsername = function (this: any, next: any) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  if (this.username && !usernameRegex.test(this.username)) {
    return next(new errorHandler("Le nom d'utilisateur est invalide. Il ne peut contenir que des lettres, chiffres et underscores.", 400));
  }
  next();
};

 
/**
 * Validates the password of the current context (`this`) against a predefined regex pattern.
 * The password must meet the following criteria:
 * - At least one uppercase letter.
 * - At least one lowercase letter.
 * - At least one digit.
 * - At least one special character (@, $, !, %, *, ?, &).
 * - Minimum length of 8 characters.
 *
 * If the password does not meet these criteria, an error is passed to the `next` callback.
 *
 * @param next - The callback function to proceed to the next middleware or handle an error.
 * @throws {Error} If the password does not meet the required criteria.
 */
export const validatePassword = function (this: any, next: any) { 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(this.password)) {
    return next(new errorHandler("Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."), 400);
  }
  next();
};


/**
 * Middleware function to hash a user's password before saving it to the database.
 * 
 * This function checks if the `password` field has been modified. If it has,
 * the function hashes the password using bcrypt with a salt round of 10 and
 * assigns the hashed password back to the `password` field. If the `password`
 * field has not been modified, the function proceeds to the next middleware.
 * 
 * @param this - The context of the document being saved, typically a Mongoose document.
 * @param next - A callback function to proceed to the next middleware in the chain.
 * 
 * @throws Will pass any error encountered during the hashing process to the `next` callback.
 */
export const hashPassword = async function (this: any, next: any) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
};

 
/**
 * Middleware function to handle the deletion of a user's profile when a user is deleted.
 *
 * This function is intended to be used as a pre-hook in a Mongoose schema. It intercepts
 * the deletion operation, retrieves the user ID from the query filter, and deletes the
 * associated profile document from the `Profile` collection.
 *
 * @async
 * @function
 * @param {any} this - The Mongoose query context, providing access to the query being executed.
 * @param {any} next - The callback to pass control to the next middleware in the stack.
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
 * - `validateUsername`: Validates the username before saving the document.
 * - `validatePassword`: Validates the password before saving the document.
 * - `hashPassword`: Hashes the user's password before saving the document.
 * - `handleUserProfileDeletion`: Handles user profile deletion before deleting the document.
 *
 * @param schema - The Mongoose schema to which the hooks will be applied.
 */
export const applyUserHooks = (schema: Schema) => {
  schema.pre('save', validateEmail);
  schema.pre('save', validateUsername);
  schema.pre('save', validatePassword);
  schema.pre('save', hashPassword);
  schema.pre('findOneAndDelete', handleUserProfileDeletion);
};
