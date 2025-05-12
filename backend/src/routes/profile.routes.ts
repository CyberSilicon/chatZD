import { Router } from 'express';
import {
  getProfileById,
  createProfile,
  updateProfileById,
  deleteProfileById,
} from '../controllers/profile.controller';
import { authenticateJWT } from '../middlewares/auth/jwt.middleware';

const router = Router();

router.get('/profile', authenticateJWT, getProfileById);
router.post('/profile', createProfile);
router.put('/profile', updateProfileById);
router.delete('/profile' ,deleteProfileById);
router.delete('/profile/me', deleteProfileById);

export default router;