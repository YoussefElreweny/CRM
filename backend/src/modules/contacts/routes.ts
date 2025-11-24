import { Router } from 'express';
import { uploadContacts, listContacts } from './controller';
import { upload } from '../../middleware/upload.middleware';

// Security is strict here!
const router = Router();

// GET /contacts (List all contacts)
router.get('/', listContacts);

// POST /contacts/upload (Receive a file named 'file')
router.post('/upload', upload.single('file'), uploadContacts);

export default router;