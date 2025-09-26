import asyncHandler from 'express-async-handler';
import Act from '../models/activityModel.js';

const addAct = asyncHandler(async (req, res) => {
  const { title, description, deadline, originalDeadline, category, notificationsAct } = req.body;

 if (!title || !deadline) {
    res.status(400);
    throw new Error("Title and deadline are required");
  }

  const newAct = new Act({
    title, 
    description, 
    deadline,
    originalDeadline: originalDeadline,
    category,
    notificationsAct,
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
    res.json( activities );
});

const deleteAct = asyncHandler(async(req,res)=>{
  const activity = await Act.findByIdAndDelete(req.params.id);
  if(activity) {
    res.json({message: "activity deleted successfully!", activity});
  } else {
    res.status(404);
    throw new Error("activity not found.");
  }
});

const editAct = asyncHandler(async(req, res)=>{
  const act = await Act.findById(req.params.id);

  if(!act){
    res.status(404);
    throw new Error("Activity not found!");
  } else {
    Object.entries(req.body).forEach(([key, value]) => {
      if (value!==undefined) {
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
      event: act,
    });
  }
});

const updateNotificationAct = asyncHandler(async(req, res) => {
    const { notificationsAct } = req.body;
    await Act.updateMany({}, { $set: { notificationsAct, reminderSentSteps: [], reminderSent: false } });

    return res.status(200).json({
      message: "All activities updated successfully",
    });
  }
);

const setCompletedAct = asyncHandler(async(req, res) => {
    const activity = await Act.findById(req.params.id);

    if(!activity){
        res.status(404);
        throw new Error("Activity not found!");
    }
   
    activity.completed = true;

    await activity.save();

    res.status(200).json({
        message: "Activity completed successfully",
        event: activity,
    });
})

export{
    addAct,
    getAct,
    deleteAct,
    editAct,
    updateNotificationAct,
    setCompletedAct
};