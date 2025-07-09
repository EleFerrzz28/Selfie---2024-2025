import express from "express"
import {createNote, editNote, getAllNotes, deleteNote, copyNote} from "../controllers/noteController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();
router.post("/add-note", protect, createNote)
router.put("/edit-note/:noteId", protect, editNote)
router.get("/get-all-notes/", protect, getAllNotes)
router.delete("/delete-note/:noteId", protect, deleteNote)
router.post("/copy-note/:noteId", protect, copyNote)
export default router;