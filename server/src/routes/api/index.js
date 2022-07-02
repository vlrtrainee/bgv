import { Router } from 'express';
import usersRoutes from './users';
import messagesRoutes from './messages';
import casesRoutes from './cases';
const router = Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);
router.use('/cases', casesRoutes);

export default router;
