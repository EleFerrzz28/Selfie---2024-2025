import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pomodoroSchema = new Schema({
    date: {
        type: Date,
        default: ()=>Date.now()
    },
    prodPeriod: {//tot min of productivity
        type: Number,
        default: 30*4 //30 minutes * 4 cycles
    },
    cycles:{
        type: Number,
        default: 4
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

const Pomodoro = mongoose.model('Pomodoro', pomodoroSchema);
export default Pomodoro;