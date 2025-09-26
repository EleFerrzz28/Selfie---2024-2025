import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addSession, getLastSession, getAllSession, setCompleted } from "../controllers/pomodoroController.js"

const pomodoroRouter = express.Router();

pomodoroRouter.post('/', protect, addSession);
pomodoroRouter.get('/last', protect, getLastSession);
pomodoroRouter.get('/', protect, getAllSession);
pomodoroRouter.patch('/:id', protect, setCompleted);

export default pomodoroRouter;