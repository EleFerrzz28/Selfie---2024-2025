import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addSession, getLastSession, getAllSession, setCompleted, editPomodoro, deletePomodoro, updateNotificationsPomo } from "../controllers/pomodoroController.js"

const pomodoroRouter = express.Router();

pomodoroRouter.post('/', protect, addSession);
pomodoroRouter.get('/last', protect, getLastSession);
pomodoroRouter.get('/', protect, getAllSession);
pomodoroRouter.patch('/:id/complete', protect, setCompleted);
pomodoroRouter.patch('/:id', protect, editPomodoro);
pomodoroRouter.put('/notifications', protect, updateNotificationsPomo);
pomodoroRouter.delete('/:id', protect, deletePomodoro);

export default pomodoroRouter;