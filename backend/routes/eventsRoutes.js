import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addEvent, getEvents, deleteEvent, editEvent, updateNotification } from "../controllers/eventsController.js";

const eventsRouter = express.Router();

eventsRouter.post('/', protect, addEvent);
eventsRouter.get('/', protect, getEvents);
eventsRouter.delete('/:id', protect, deleteEvent);
eventsRouter.patch('/:id', protect, editEvent);
eventsRouter.patch('/', protect, updateNotification);

export default eventsRouter;