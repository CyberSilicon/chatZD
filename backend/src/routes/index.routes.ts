import { Router } from 'express';
import profileRoutes from './profile.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import sessionRoutes from './session.routes';
import chatRoutes from './chat.routes';
// import { updateActivity } from '@/controllers/session.controller';

const router = Router();

router.get('/', (req: any, res: any) => {
  res.json({ message: 'Bienvenue sur API de maki nait ammar' });
});


router.use('/api/v1', profileRoutes);
router.use('/api/v1', userRoutes);
router.use('/api/v1', authRoutes);
router.use('/api/v1', sessionRoutes);
router.use('/api/v1', chatRoutes);
// router.post('/api/v1/session/activity', updateActivity);

export default router;
