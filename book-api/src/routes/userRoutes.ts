import { Router } from 'express';
import * as userController from '../controllers/userController';
import auth from '../authorization/auth';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me', auth(), userController.getCurrentUser);
router.put('/:id/role', auth(['1']), userController.changeUserRole);

export default router;
