const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatModel.js")
const User = require("../models/userModel.js")
const File = require("../models/fileModel.js")
const Subject = require("../models/subjectModel.js")

const addSubjects = asyncHandler(async(req,res) => {
    const {chatId, subjectName, teacherName} = req.body

    if (!subjectName || !chatId  || !teacherName) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
      }
    const chatExists = await Chat.findOne({ chatId })

    if(!chatExists){
          res.status(400)
          throw new Error("No room Exists")
      }

    const newSubject = await Subject.create({
        subjectName: subjectName,
        teacherName: teacherName,
        chat: chatId,

    })

    try{
        var subject = await Subject.create(newSubject)
        subject = await subject.populate("sender", "name pic")
        subject = await subject.populate("chat")
        subject = await subject.populate("subjectName")

        res.json(subject)
        console.log(subject._id)

    }catch(e){
        res.status(400);
        throw new Error(error.message);
    }
})

const getSubjects = asyncHandler(async(req,res) => {
    try{
        const subject = await Subject.find({ chat: req.params.chatId })
        .populate("chat")
        .populate("subjectName")
      res.json(subject);

    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }

})


module.exports ={addSubjects, getSubjects}