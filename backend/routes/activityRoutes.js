import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addAct, getAct, deleteAct, editAct } from "../controllers/activityController.js";

const actRouter = express.Router();

actRouter.post('/', protect, addAct);
actRouter.get('/', protect, getAct);
actRouter.delete('/:id', protect, deleteAct);
actRouter.patch('/:id', protect, editAct)

export default actRouter;