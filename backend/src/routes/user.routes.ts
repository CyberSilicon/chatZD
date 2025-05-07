import { Router } from 'express';
import {
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller';
import { register } from '../controllers/auth.controller';


const router = Router();

router.get('/user', getUserById);
router.post('/auth/register', register);
router.put('/user', updateUserById);
router.delete('/user', deleteUserById);

export default router;
