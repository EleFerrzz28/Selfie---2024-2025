import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // se vogliamo usare protect alla lo mettiamo come primo argomento

const router = express.Router();

router.post('/', registerUser); // POST --> api/users - Register a user 
router.post('/auth', authUser); // POST --> api/users/auth - authenticate a user and get token
router.post('/logout', logoutUser); // POST --> api/users/logout - Logout user and clear cookie
router
  .route('/profile') // protected route
  .get(protect, getUserProfile) // GET --> api/users/profile - Get user profile 
  .put(protect, updateUserProfile); // PUT --> api/users/profile - update profile 

export default router;