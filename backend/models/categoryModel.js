import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    color: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
})

const Cat = mongoose.model('Category', categoriesSchema);
export default Cat;