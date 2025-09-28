import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addAct, getAct, deleteAct, editAct, updateNotificationAct, setCompletedAct } from "../controllers/activityController.js";

const actRouter = express.Router();

actRouter.post('/', protect, addAct);
actRouter.get('/', protect, getAct);
actRouter.delete('/:id', protect, deleteAct);
actRouter.patch('/:id', protect, editAct);
actRouter.patch('/', protect, updateNotificationAct);
actRouter.patch('/:id/complete', protect, setCompletedAct);

export default actRouter;