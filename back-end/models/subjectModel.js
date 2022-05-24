const mongoose = require('mongoose');

const subjectModel = mongoose.Schema(
    {
        sender:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        subjectName:
        {
            type: String,
            require: true
        },
        teacherName:
        {
            type:String,
            require: true
        },
        chat:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
        file:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        }
    },
    {
        timestamps:true
    }
)


const Subject = mongoose.model('Subject', subjectModel);

module.exports = Subject;