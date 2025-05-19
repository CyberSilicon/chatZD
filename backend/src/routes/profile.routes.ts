import { Router } from 'express';
import {
  getProfileById,
  createProfile,
  updateProfileById,
  deleteProfileById,
} from '../controllers/profile.controller';
import { isAuthenticated } from '../middlewares/auth/auth.middleware';

const router = Router();

router.get('/profile', isAuthenticated, getProfileById);
router.post('/profile', createProfile);
router.put('/profile', updateProfileById);
router.delete('/profile' ,deleteProfileById);
router.delete('/profile/me', deleteProfileById);

export default router;