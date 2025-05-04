import { Router } from 'express';
import {
  getProfileById,
  createProfile,
  updateProfileById,
  deleteProfileById,
} from '../controllers/profile.controller';

const router = Router();

router.get('/:id', getProfileById);
router.post('/', createProfile);
router.put('/', updateProfileById);
router.delete('/', deleteProfileById);

export default router;