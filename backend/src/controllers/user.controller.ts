import { Request, Response } from 'express';
import { IUser, User } from '../models/user.model';

/**
 * Retrieves a user by their ID from the database.
 *
 * @param req - The HTTP request object, containing the user ID in `req.body.id`.
 * @param res - The HTTP response object used to send the response.
 * @returns A Promise that resolves to void. Sends a JSON response with the user data if found,
 *          a 404 status with an error message if the user is not found, or a 500 status with
 *          an error message in case of a server error.
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const user = await User.findById(id).populate('profile');

    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/**
 * Updates a user by their ID with the provided updates.
 *
 * @param req - The HTTP request object containing the user ID and update data in the body.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a JSON response with the updated user data
 *          or an error message if the update fails.
 *
 * @throws {Error} If an error occurs during the update process, a 400 status code is returned
 *                 with an error message.
 *
 * @example
 * // Request body:
 * // {
 * //   "id": "12345",
 * //   "name": "Updated Name",
 * //   "email": "updatedemail@example.com"
 * // }
 *
 * // Response (200):
 * // {
 * //   "_id": "12345",
 * //   "name": "Updated Name",
 * //   "email": "updatedemail@example.com",
 * //   "profile": { ... }
 * // }
 *
 * // Response (404):
 * // {
 * //   "message": "Utilisateur non trouvé"
 * // }
 *
 * // Response (400):
 * // {
 * //   "message": "Erreur lors de la mise à jour de l'utilisateur",
 * //   "error": { ... }
 * // }
 */
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, ...updates } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('profile');

    if (!updatedUser) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
  }
};


/**
 * Deletes a user by their ID.
 *
 * This function handles an HTTP request to delete a user from the database
 * based on the ID provided in the request body. If the user is successfully
 * deleted, a success message is returned. If the user is not found, a 404
 * status code with an appropriate message is returned. In case of server
 * errors, a 500 status code is returned with the error details.
 *
 * @param req - The HTTP request object, containing the user ID in the body.
 * @param res - The HTTP response object used to send the response.
 * @returns A promise that resolves to void.
 */
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
