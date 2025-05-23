import { Router } from 'express';
import profileRoutes from './profile.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = Router();

router.get('/', (req: any, res: any) => {
  res.json({ message: 'Bienvenue sur API de maki nait ammar' });
});

router.use('/api/v1', profileRoutes);
router.use('/api/v1', userRoutes);
router.use('/api/v1', authRoutes);

export default router;
