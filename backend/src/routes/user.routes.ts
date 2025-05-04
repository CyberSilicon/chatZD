import { Router } from 'express';
import {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller';

const router = Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/', updateUserById);
router.delete('/', deleteUserById);

export default router;
