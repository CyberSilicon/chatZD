import { Router } from 'express';
import profileRoutes from './profile.routes';

const router = Router();

router.get('/', (req: any, res: any) => {
  res.json({ message: 'Bienvenue sur API de maki nait ammar' });
});

router.use('/profiles', profileRoutes);

export default router;
