import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import {
  register,
  login,
  getProfile,
  updateProfile
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login',  login);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);
//router.get('/profile', protect, getProfile);
//router.put('/profile', protect, updateProfile);

export default router;