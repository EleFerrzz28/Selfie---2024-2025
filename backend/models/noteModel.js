import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    creation_date: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    last_update_date: {
        type: Date,
        default: () => Date.now()
    },
    pinned: {
        type: Boolean,
        default: false
    }
})

noteSchema.set('toJSON', {
  virtuals: true,       
  versionKey: false,    
  transform: (doc, ret) => {
    ret.id = ret._id;   
    delete ret._id;     
  }
});


const Note = mongoose.model('Note', noteSchema);
export default Note;