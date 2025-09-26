import Pomodoro from "../models/pomodoroModel.js"
import AsyncHandler from "express-async-handler"

const addSession=(async(req, res)=>{
    const {date, originalDate, description, prodPeriod, breakPeriod, longBreakPeriod, cycles, planned, completed} = req.body;

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
        completed,
        user: req.user._id,
    });

    await newSession.save();

    res.status(201).json({
        message: "Session added successfully",
        activity: newSession,
    });
});

const getLastSession = AsyncHandler(async (req, res) => {
    const lastSession = await Pomodoro.find({user: req.user._id}).sort({date:-1});
    res.json(lastSession)
});

const getAllSession = AsyncHandler(async(req, res) => {
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

const setCompleted = AsyncHandler(async(req, res) => {
    const pomodoro = await Pomodoro.findById(req.params.id);

    if(!pomodoro){
        res.status(404);
        throw new Error("Pomodoro not found!");
    }
   
    pomodoro.completed = true;
    pomodoro.planned = false;

    await pomodoro.save();

    res.status(200).json({
        message: "Pomodoro completed successfully",
        event: pomodoro,
    });
})

//req: request, res: response

export{
    addSession,
    getLastSession,
    getAllSession,
    setCompleted
};