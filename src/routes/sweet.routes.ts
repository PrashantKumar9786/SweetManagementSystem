import { Router } from 'express';
import SweetController from '../controllers/sweet.controller';
import { auth, adminOnly } from '../middleware/auth.middleware';

const router = Router();

// Public routes (no authentication required)
router.get('/', SweetController.getAll);
router.get('/search', SweetController.search);
router.get('/:id', SweetController.getById);

// Protected routes (authentication required)
router.post('/', auth, SweetController.create);
router.put('/:id', auth, SweetController.update);
router.delete('/:id', auth, adminOnly, SweetController.delete);

// Inventory management routes
router.post('/:id/purchase', auth, SweetController.purchase);
router.post('/:id/restock', auth, adminOnly, SweetController.restock);

export default router;
