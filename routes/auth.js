const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../data/users");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser = users.find(user => user.email === email);

if (existingUser) {
    return res.status(400).json({
        message: "Email already registered"
    });
}


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword
    };
    
    users.push(newUser);
    
    return res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and Password are required"
        });
    }

    const user = users.find(user => user.email === email);

if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return res.status(401).json({
        message: "Invalid Password"
    });
}

const token = jwt.sign(
    {
        id: user.id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

return res.status(200).json({
    message: "Login Successful",
    token,
    user: {
        id: user.id,
        username: user.username,
        email: user.email
    }
});

});

router.get("/profile", authMiddleware, (req, res) => {

    return res.status(200).json({
        message: "Protected Route Accessed Successfully",
        user: req.user
    });

});

module.exports = router;