const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const {registerValidation, loginValidation} = require('../validation');
const verify = require('./verifyToken');


dotenv.config({ path: './config.env'});

// Register
router.post('/register', async (req,res) => {
    //  Validation before become a user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user alr in db
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send("Email already exists.")

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword

    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login' , async (req,res) => {
    // Validation before login
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email not found");
    // password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");


    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth_token', token).send(token);
    return res.json({token});

    res.send('Logged in!');
    // res.send({token});
  
})

router.get("/verify", verify, async(req,res)=>{
    try {
        // res.send(req.user);
        res.json(true);
    } catch (err) {
        console.error(err.message);
    }
})


module.exports = router