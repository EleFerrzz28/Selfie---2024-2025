import Pomodoro from "../models/pomodoroModel.js"
import AsyncHandler from "express-async-handler"

const addSession=(async(req, res)=>{
    const {date, prodPeriod, cycles} = req.body;

    /*if(!date || !prodPeriod || !cycles){
        res.status(400);
        throw new Error("All the fields are required!");
    }*/

    const newSession = new Pomodoro({
        date, 
        prodPeriod,
        cycles,
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

//req: request, res: response

export{
    addSession,
    getLastSession
};