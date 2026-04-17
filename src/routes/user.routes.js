import { Router } from 'express';
import { listUsers, getUser, deleteUser } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authenticate, requireRole('admin'), listUsers);
router.get('/:id', authenticate, requireRole('admin'), getUser);
router.delete('/:id', authenticate, requireRole('admin'), deleteUser);

export default router;
