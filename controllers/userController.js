const asyncHandler = require("express-async-handler");//to avoid try catch block in promise 
const bcrypt = require("bcrypt");// used in creation of hashed password
const jwt = require("jsonwebtoken");//used in creation of json web token
//A JSON Web Token (JWT) is like a digital ID card used for secure communication between a user and a server. It helps in user authentication (logging in) and authorization (giving access to specific parts of a website or app).
const User = require("../models/userModel");

//@desc Register a user
//@route POST/api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailaible = await User.findOne({ email });
    if (userAvailaible) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed passsword", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User ${user} created successfully!`);
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data!");
    }
});

//@desc Login a user
//@route POST/api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });//find user by email
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({//create json web token
            user: {
                username: user.username,
                email: user.email,
                id: user._id 
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid!");
    }
    // res.json({
    //     message: "Login user"
    // });
});

//@desc current user info
//@route POST/api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});



module.exports = { registerUser, loginUser, currentUser };