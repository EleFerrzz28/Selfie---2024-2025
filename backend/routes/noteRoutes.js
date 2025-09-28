import express from "express"
import {createNote, editNote, pinNote, getAllNotes, getLastUpdatedNote, deleteNote, copyNote} from "../controllers/noteController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();
router.post("/add-note", protect, createNote)
router.put("/edit-note/:noteId", protect, editNote)
router.patch("/pinunpin-note/:noteId", protect, pinNote)
router.get("/get-all-notes/", protect, getAllNotes)
router.get("/get-last-updated-note/", protect, getLastUpdatedNote)
router.delete("/delete-note/:noteId", protect, deleteNote)
router.post("/copy-note/:noteId", protect, copyNote)
export default router;