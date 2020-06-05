const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    notes:[{
        title:{
            type:String
        },
        content:{
            type:String
        }
    }]
});

const Note = mongoose.model("Note", notesSchema);

module.exports  = Note;