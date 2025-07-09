import asyncHandler from 'express-async-handler';
import Event from '../models/eventsModel.js';

const addEvent = asyncHandler(async (req, res) => {
  const { title, description, time, day, location, category } = req.body;

 if (!title || !time || !day) {
    res.status(400);
    throw new Error("Title, time, and day are required");
  }

  const newEvent = new Event({
    title, 
    description, 
    time, 
    day, 
    location, 
    category,
    user: req.user._id,
  });

  await newEvent.save();
  
  res.status(201).json({
    message: "Event added successfully",
    event: newEvent,
  });
});

const getEvents = asyncHandler(async (req, res) => {
    try{
      const events = await Event.find({ user: req.user._id });
      res.json( events );
    } catch (error) {
      return res.status(500).json({
          error: true,
          message: "Internal Server Error"
      });
    }
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete( req.params.id );
  if (event) {
    res.json({ message: "Event deleted successfully", event });
  } else {
    res.status(404);
    throw new Error("Event not found.");
  }
});

const editEvent = asyncHandler(async(req, res) =>{
  const event = await Event.findById(req.params.id);
  const { title, description, time, day, location, category } = req.body; 

  if (title==undefined || time==undefined || day==undefined) {
    res.status(400);
    throw new Error("Title, time, and day are required");
  }

  if(!event){
    res.status(404);
    throw new Error("Event not found!");
  } else {
    Object.entries(req.body).forEach(([key, value]) => {
      if (value!==undefined) {
        event[key] = value;
      }
    });
    
    await event.save();
  
    res.status(200).json({
      message: "Event updated successfully",
      event: event,
    });
  }
});

export{
    addEvent,
    getEvents,
    deleteEvent,
    editEvent
};