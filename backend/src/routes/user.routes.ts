import { Router } from 'express';
import {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller';

const router = Router();

router.get('/user', getUserById);
router.post('/auth/register', createUser);
router.put('/', updateUserById);
router.delete('/', deleteUserById);

export default router;
