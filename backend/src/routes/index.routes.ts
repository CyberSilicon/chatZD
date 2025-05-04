import { Router } from 'express';
import profileRoutes from './profile.routes';
import userRoutes from './user.routes';

const router = Router();

router.get('/', (req: any, res: any) => {
  res.json({ message: 'Bienvenue sur API de maki nait ammar' });
});

router.use('/profiles', profileRoutes);
router.use('/api/v1', userRoutes);

export default router;
