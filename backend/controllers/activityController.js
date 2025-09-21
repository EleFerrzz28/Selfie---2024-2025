import asyncHandler from 'express-async-handler';
import Act from '../models/activityModel.js';

const addAct = asyncHandler(async (req, res) => {
  const { title, description, deadline, category, notifications } = req.body;

  if (!title || !deadline) {
    res.status(400);
    throw new Error("Title and deadline are required");
  }

  const newAct = new Act({
    title,
    description,
    deadline,
    category,
    notifications,
    reminderSentSteps: [],
    reminderSent: false,
    completed: false,          
    user: req.user._id,
  });

  await newAct.save();

  res.status(201).json({
    message: "Activity added successfully",
    activity: newAct,
  });
});

const getAct = asyncHandler(async (req, res) => {
  const activities = await Act.find({ user: req.user._id });
  res.json(activities);
});

const deleteAct = asyncHandler(async (req, res) => {
  const activity = await Act.findByIdAndDelete(req.params.id);
  if (activity) {
    res.json({ message: "Activity deleted successfully!", activity });
  } else {
    res.status(404);
    throw new Error("Activity not found.");
  }
});

// ➤ Modifica un’attività
const editAct = asyncHandler(async (req, res) => {
  const act = await Act.findById(req.params.id);

  if (!act) {
    res.status(404);
    throw new Error("Activity not found!");
  }

  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined) {
      act[key] = value;
    }
  });

  // Se cambiano le notifiche → reset dei reminder
  if (req.body.notifications) {
    act.reminderSentSteps = [];
    act.reminderSent = false;
  }

  await act.save();

  res.status(200).json({
    message: "Activity updated successfully",
    activity: act,
  });
});

const updateNotificationAct = asyncHandler(async (req, res) => {
  const { notifications } = req.body;
  await Act.updateMany({}, { $set: { notifications, reminderSentSteps: [], reminderSent: false } });

  return res.status(200).json({
    message: "All activities updated successfully",
  });
});

const completeAct = asyncHandler(async (req, res) => {
  const act = await Act.findById(req.params.id);

  if (!act) {
    res.status(404);
    throw new Error("Activity not found!");
  }

  act.completed = true;
  await act.save();

  res.status(200).json({
    message: "Activity marked as completed",
    activity: act,
  });
});

export {
  addAct,
  getAct,
  deleteAct,
  editAct,
  updateNotificationAct,
  completeAct,   
};
