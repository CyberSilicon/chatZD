import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { validateRegister } from '../middlewares/auth/register.middleware';
import { validateLogin } from '../middlewares/auth/login.middleware';


const router = Router();

router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin,  login)
router.post('/auth/logout', logout);

export default router;
