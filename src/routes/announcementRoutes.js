import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createAnnouncement,
  getAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} from '../controllers/announcementControllers.js';

const router = express.Router();

router.post('/', protect, createAnnouncement);
router.get('/',protect, getAnnouncement);
router.get('/:id', protect, getAnnouncementById);
router.delete('/:id', protect, deleteAnnouncement);
router.put('/:id', protect, updateAnnouncement);

export default router;