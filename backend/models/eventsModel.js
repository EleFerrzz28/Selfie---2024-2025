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
        type: String, 
        required: true 
    },
    day: { 
        type: Date, 
        required: true
    },
    location: { 
        type: String 
    },
    category:  {
        type:String 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
})

const Event = mongoose.model('Event', eventsSchema);
export default Event;