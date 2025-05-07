import { Request, Response } from 'express';
import { IProfile, Profile } from '../models/profile.model';

/**
 * Retrieves a profile by its ID from the database.
 *
 * @param req - The HTTP request object, containing the profile ID in `req.params.id`.
 * @param res - The HTTP response object used to send the response.
 * @returns A Promise that resolves to void. Sends a JSON response with the profile data if found,
 *          a 404 status with an error message if the profile is not found, or a 500 status with
 *          an error message in case of a server error.
 */
export const getProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const profile = await Profile.findById(id);

    if (!profile) {
      res.status(404).json({ message: 'Profil non trouvé' });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


/**
 * Handles the creation of a new profile.
 *
 * This function extracts profile data from the request body, creates a new
 * profile instance, saves it to the database, and returns the created profile
 * in the response. If an error occurs during the process, it sends a 400 status
 * code with an error message.
 *
 * @param req - The HTTP request object, containing the profile data in the body.
 * @param res - The HTTP response object, used to send the response back to the client.
 * @returns A promise that resolves to void.
 *
 * @throws Will send a 400 status code with an error message if the profile creation fails.
 */
export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileData: IProfile = req.body;
    const newProfile = new Profile(profileData);
    console.log('Creating profile:', newProfile);

    await newProfile.save();
    res.status(201).json(newProfile);
} catch ({ message }: any) {
    console.error('Error creating profile:', message);
    res.status(400).json({ message: 'Erreur lors de la création du profil' }); 
  }
};


/**
 * Updates a user profile by its ID.
 *
 * @param req - The HTTP request object containing the profile ID and update data in the body.
 * @param res - The HTTP response object used to send the response.
 * @returns A promise that resolves to void. Sends a JSON response with the updated profile or an error message.
 *
 * @throws Will return a 404 status if the profile is not found.
 * @throws Will return a 400 status if there is an error during the update process.
 */
export const updateProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, ...updates } = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProfile) {
      res.status(404).json({ message: 'Profil non trouvé' });
      return;
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du profil', error });
  }
};


/**
 * Deletes a user profile by its ID.
 *
 * @param req - The HTTP request object containing the profile ID in the body.
 * @param res - The HTTP response object used to send the response.
 * @returns A promise that resolves to void.
 *
 * @throws Will return a 404 status if the profile is not found.
 * @throws Will return a 500 status if a server error occurs.
 */
export const deleteProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    const deletedProfile = await Profile.findByIdAndDelete(id);

    if (!deletedProfile) {
      res.status(404).json({ message: 'Profil non trouvé' });
      return;
    }

    res.status(200).json({ message: 'Profil supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};



// export const getcurrentUserProfile = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.body;

//     const deletedProfile = await Profile.findByIdAndDelete(id);

//     if (!deletedProfile) {
//       res.status(404).json({ message: 'Profil non trouvé' });
//       return;
//     }

//     res.status(200).json({ message: 'Profil supprimé avec succès' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur serveur', error });
//   }
// };