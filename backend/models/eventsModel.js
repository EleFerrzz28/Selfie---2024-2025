import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    time: { 
        type: String
    },
    endTime: {
        type: String
    },
    day: { 
        type: Date
    },
    endDay: {
        type: Date,
    }, 
    repeat: {
        type: String,
    },
    weekDay: [{
        type: Number
    }],
    location: { 
        type: String 
    },
    category:  {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
    },
    notificationsEvent: {
        type: String,
        default: '5min'
    },
    reminderSentSteps: {
        type: [String],   
        default: []
    },
    reminderSent: {
        type: Boolean,
        default: false
    },
    reminderSent: {
        type: Boolean,
        default: false
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
})

const Event = mongoose.model('Event', eventsSchema);
export default Event;