//login
//signup
//register student
//register faculty

import UserModel from "../models/user.model.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate Access Token
const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, role, collegeName } = req.body;

            if (!name || !email || !password || !role || !collegeName) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                role,
                collegeName
            });

            const token = generateToken(user._id);

            res
                .status(201)
                .cookie('accessToken', token, { httpOnly: true, secure: false })
                .json({
                    success: true,
                    message: 'User registered successfully',
                    user: { _id: user._id, name: user.name, email: user.email, role: user.role, collegeName: user.collegeName, createdAt: user.createdAt, token: token },
                    token
                });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    loginUser: async (req, res) => {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await UserModel.findOne({ email });
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = generateToken(user._id);

            res
                .status(200)
                .cookie('accessToken', token, { httpOnly: true, secure: false })
                .json({
                    success: true,
                    message: 'Login successful',
                    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
                    token
                });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }

    },

    logoutUser: async (req, res) => {
        res
            .clearCookie('accessToken')
            .status(200)
            .json({ success: true, message: 'Logged out successfully' });
    },
    getCurrentUser: async (req, res) => {
        res.status(200).json({
            success: true,
            user: req.user
        });
    },
    changePasswod: async (req, res) => {
        try {
            const userId = req.user._id;
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({ message: 'Both current and new passwords are required' });
            }

            // Find user by ID
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if current password is correct
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update password
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ success: true, message: 'Password changed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

}

export default userController;