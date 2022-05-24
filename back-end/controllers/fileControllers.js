const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")
const Message = require("../models/messageModel.js")
const Chat = require("../models/chatModel.js");
const File = require("../models/fileModel.js")
const multer = require('multer');
var path = require('path');
const Subject = require("../models/subjectModel.js")




const upload = asyncHandler(async (req,res) => {
  try {
    const { title, description, subjectId, fileType } = req.body;
    const { path, mimetype } = req.file;
    const file = new File({
      title,
      description,
      file_path: path,
      file_mimetype: mimetype,
      subject: subjectId,
      fileType: fileType,

    });
    await file.populate("subject")
    // file = await file.populate("title")
    await file.save();
    res.send(file);
  } catch (error) {
    res.status(400).send('Error while uploading file. Try again later.');
  }

(error, req, res, next) => {
  if (error) {
    res.status(500).send(error.message);
  }
}
});

const getAllFiles = asyncHandler(async (req,res) => {
  try {
    const files = await File.find({subject: req.params.subjectId});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

const download = asyncHandler(async (req,res) => {
    try {
        const file = await File.findById(req.params.id);
        res.set({
          'Content-Type': file.file_mimetype
        });
        res.sendFile(path.join(__dirname, '..', file.file_path));

      } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
      }
})

module.exports = {upload, getAllFiles, download}