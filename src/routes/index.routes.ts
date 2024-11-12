import userRoutes from './user.routes'
import qrsRoutes from './qrcode.routes';
import { Router } from 'express';
const router= Router();
router.use('/users', userRoutes);
router.use('/qrs', qrsRoutes);

export default router;