import asyncHandler from 'express-async-handler';
import Note from '../models/noteModel.js';


// Add Note
const createNote = asyncHandler(async (req, res) => {
    const { title, desc, tags, creation_date } = req.body;
    const user = req.user;

    if (!title) {
        return res
            .status(400)
            .json({ error: true, message: "Title is required" })
    }
    if (!desc) {
        return res
            .status(400)
            .json({ error: true, message: "Content is required" })
    }

    try {
        const note = new Note({
            title,
            desc,
            tags: tags || [],
            creation_date,
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added succesfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        })
    }
});

// Edit Note
const editNote = asyncHandler(async (req, res) => {
    const noteId = req.params.noteId;
    const { title, desc, tags } = req.body;
    const user = req.user;

    if (!title && !desc && !tags) {
        return res
            .status(400)
            .json({ error: true, message: "No changes provided" })
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        if (title) note.title = title;
        if (desc) note.desc = desc;
        if (tags) note.tags = tags;
        note.last_update_date = Date.now();

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
});

// Pin/Unpin
const pinNote = asyncHandler(async (req, res) => {
    const noteId = req.params.noteId;
    const user = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        note.pinned = !note.pinned

        await note.save();

        return res.json({
            error: false,
            pinned: note.pinned,
            note,
            message: note.pinned
                ? "Note pinned successfully"
                : "Note unpinned successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
});

// Get All Notes
const getAllNotes = asyncHandler(async (req, res) => {
    const user = req.user;

    try {
        const notes = await Note.find({ userId: user._id });
        res.json({ notes });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Get Last Updated Note
const getLastUpdatedNote = asyncHandler(async (req, res) => {
    const user = req.user;
    try {
        const note = await Note.findOne({ userId: user._id }).sort({ last_update_date: -1 });

        if (!note) {
            return res.status(404).json({ message: "No Note Found" });
        }
        res.json(note); 

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});


// Delete Note
const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.noteId;
    const user = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id })

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }

        await Note.deleteOne({ _id: noteId, userId: user._id })
        return res.json({
            error: false,
            message: "Note deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Copy Note
const copyNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const user = req.user;

    try {
        const originalNote = await Note.findOne({ _id: noteId, userId: user._id });

        if (!originalNote) {
            return res.status(404).json({
                error: true,
                message: "Original note not found",
            });
        }

        const copiedNote = new Note({
            title: `Copy of ${originalNote.title}`, // Optional: Modify title
            desc: originalNote.desc,
            tags: [...originalNote.tags], // Ensures array copy
            userId: user._id,
        });

        await copiedNote.save();

        return res.json({
            error: false,
            note: copiedNote,
            message: "Note copied successfully",
        });
    } catch (error) {
        console.error("Error copying note:", error);
        res.status(500).json({
            error: true,
            message: "Failed to copy note",
        });
    }
});



export { createNote, editNote, pinNote, getAllNotes, getLastUpdatedNote, deleteNote, copyNote }