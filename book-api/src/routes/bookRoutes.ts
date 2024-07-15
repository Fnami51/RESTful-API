import { Router } from 'express';
import * as bookController from '../controllers/bookController';
import auth from '../authorization/auth';

const router = Router();

router.post('/', auth(['1']), bookController.addBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', auth(['1']), bookController.updateBook);
router.delete('/:id', auth(['1']), bookController.deleteBook);

export default router;
