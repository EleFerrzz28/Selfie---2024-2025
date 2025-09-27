import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pomodoroSchema = new Schema({
    date: {
        type: Date
    },
    originalDate: {
        type: Date
    },
    description: {
        type: String
    },
    prodPeriod: {//tot min of productivity
        type: Number,
        default: 30*4 //30 minutes * 4 cycles
    },
    breakPeriod:{
        type: Number,
        default: 5,
    },
    longBreakPeriod:{
        type:Number,
        default: 15,
    },
    cycles:{
        type: Number,
        default: 4
    },
    planned: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: true,
    },
    notificationsPomo: {
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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

const Pomodoro = mongoose.model('Pomodoro', pomodoroSchema);
export default Pomodoro;