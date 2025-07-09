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
    category:  {
        type:String 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
})

const Act = mongoose.model('Activity', activitiesSchema);
export default Act;