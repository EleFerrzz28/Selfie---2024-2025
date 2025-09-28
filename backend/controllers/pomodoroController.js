import Pomodoro from "../models/pomodoroModel.js"
import asyncHandler from "express-async-handler"

const addSession=(async(req, res)=>{
    const {date, originalDate, description, prodPeriod, breakPeriod, longBreakPeriod, cycles, planned, completedPomo, notificationsPomo} = req.body;

    if(!date){
        res.status(400);
        throw new Error("Day is required!");
    }

    const newSession = new Pomodoro({
        date, 
        originalDate,
        description,
        prodPeriod,
        breakPeriod,
        longBreakPeriod,
        cycles,
        planned, 
        completedPomo,
        notificationsPomo,
        user: req.user._id,
    });

    await newSession.save();

    res.status(201).json({
        message: "Session added successfully",
        activity: newSession,
    });
});

const getLastSession = asyncHandler(async (req, res) => {
    const lastSession = await Pomodoro.find({user: req.user._id}).sort({date:-1});
    res.json(lastSession)
});

const getAllSession = asyncHandler(async(req, res) => {
    try{
      const sessions = await Pomodoro.find({ user: req.user._id });
      res.json( sessions );
    } catch (error) {
      return res.status(500).json({
          error: true,
          message: "Internal Server Error"
      });
    }
})

const setCompleted = asyncHandler(async(req, res) => {
    const pomodoro = await Pomodoro.findById(req.params.id);

    if(!pomodoro){
        res.status(404);
        throw new Error("Pomodoro not found!");
    }
   
    pomodoro.completedPomo = true;
    pomodoro.planned = false;

    await pomodoro.save();

    res.status(200).json({
        message: "Pomodoro completed successfully",
        event: pomodoro,
    });
})

const editPomodoro = asyncHandler(async(req, res) =>{
  const pomodoro = await Pomodoro.findById(req.params.id);

  if(!pomodoro){
    res.status(404);
    throw new Error("Pomodoro not found!");
  } else {
    Object.entries(req.body).forEach(([key, value]) => {
      if (value!==undefined) {
        pomodoro[key] = value;
      }
    });

    if (req.body.notifications) {
      pomodoro.reminderSentSteps = [];
      pomodoro.reminderSent = false;
    }

    await pomodoro.save();
  
    res.status(200).json({
      message: "Pomodoro updated successfully",
      event: pomodoro,
    });
  }
});

const updateNotificationsPomo = asyncHandler(async(req, res) => {
    const { notificationsPomo } = req.body;
    await Pomodoro.updateMany({}, { 
      $set: { 
        notificationsPomo: notificationsPomo,
        reminderSentSteps: [],
        reminderSent: false,
      } 
    });

    return res.status(200).json({
      message: "All events updated successfully",
    });
  }
);

const deletePomodoro = asyncHandler(async (req, res) => {
  const pomodoro = await Pomodoro.findByIdAndDelete( req.params.id );
  if (pomodoro) {
    res.json({ message: "Pomodoro deleted successfully", pomodoro });
  } else {
    res.status(404);
    throw new Error("Pomodoro not found.");
  }
});

//req: request, res: response

export{
    addSession,
    getLastSession,
    getAllSession,
    setCompleted,
    editPomodoro, 
    updateNotificationsPomo,
    deletePomodoro
};