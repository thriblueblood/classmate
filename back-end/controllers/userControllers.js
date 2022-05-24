const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../config/generateToken.js")

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password, pic} = req.body

    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error("User already Exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to create the User")
    }
})

const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error("invalid email or password")
    }
})

const allUsers = asyncHandler(async(req,res) => {
    const keyword = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: "i"}},

        ],
    }
    :{};
    const users = await User.find(keyword).find({_id: {$ne:req.user._id}})
    res.send(users)

})

const editUser = asyncHandler(async(req,res) => {
    const { _id ,name, email, password, pic} = req.body
    const user = await User.findByIdAndUpdate(
        _id,
        {
            name, email, password, pic
        },
        {
            new:true
        }
    )

    const updatedUser = await user.save()

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        password : updatedUser.password,
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id)
    })
})

module.exports = {registerUser, authUser, allUsers, editUser}