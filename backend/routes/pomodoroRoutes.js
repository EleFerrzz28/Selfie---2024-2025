import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addSession, getLastSession } from "../controllers/pomodoroController.js"

const pomodoroRouter = express.Router();

pomodoroRouter.post('/', protect, addSession);
pomodoroRouter.get('/last', protect, getLastSession);

export default pomodoroRouter;