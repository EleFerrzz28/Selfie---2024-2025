import asyncHandler from 'express-async-handler';
import Event from '../models/eventsModel.js';

const addEvent = asyncHandler(async (req, res) => {
  const { title, description, time, day, endDay, repeat, weekDay, location, category, notificationsEvent, googleEventId } = req.body;

 if (!title || !day) {
    res.status(400);
    throw new Error("Title and day are required");
  }

  const newEvent = new Event({
    title, 
    description, 
    time,
    day, 
    endDay,
    repeat,
    weekDay,
    location, 
    category,
    notificationsEvent,
    reminderSentSteps: [],
    reminderSent: false,
    user: req.user._id,
    googleEventId,
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

  if(!event){
    res.status(404);
    throw new Error("Event not found!");
  } else {
    Object.entries(req.body).forEach(([key, value]) => {
      if (value!==undefined) {
        event[key] = value;
      }
    });

    if (req.body.notifications) {
      event.reminderSentSteps = [];
      event.reminderSent = false;
    }

    await event.save();
  
    res.status(200).json({
      message: "Event updated successfully",
      event: event,
    });
  }
});

const updateNotification = asyncHandler(async(req, res) => {
    const { notificationsEvent } = req.body;
    await Event.updateMany({}, { 
      $set: { 
        notifications: notificationsEvent,
        reminderSentSteps: [],
        reminderSent: false,
      } 
    });

    return res.status(200).json({
      message: "All events updated successfully",
    });
  }
);

export{
    addEvent,
    getEvents,
    deleteEvent,
    editEvent,
    updateNotification
};