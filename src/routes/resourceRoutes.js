import express from 'express';

import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} from '../controllers/resourceControllers.js';

import upload from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('file'), createResource);
router.get('/', protect, getResources);
router.get('/:id',protect,  getResourceById);
router.put('/:id', protect, updateResource);
router.delete('/:id',protect,  deleteResource);

export default router;