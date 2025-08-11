// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// export const registerUser = async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: 'User already exists' });

//         const user = await User.create({ username, email, password });

//         res.status(201).json({
//             _id: user.id,
//             username: user.username,
//             email: user.email,
//             token: generateToken(user._id),
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (user && (await user.matchPassword(password))) {
//             res.json({
//                 _id: user.id,
//                 username: user.username,
//                 email: user.email,
//                 token: generateToken(user._id),
//             });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
