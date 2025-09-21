import mongoose from "mongoose";
const Schema = mongoose.Schema;

const activitiesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    deadline: {
        type: Date,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    notifications: {
        type: String,
        default: '5min',
    },
    reminderSentSteps: {
        type: [String],
        default: []
    },
    reminderSent: {
        type: Boolean,
        default: false
    },
    completed: {            
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

const Act = mongoose.model('Activity', activitiesSchema);
export default Act;