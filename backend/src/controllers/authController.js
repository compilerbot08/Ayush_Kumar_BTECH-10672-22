/*
 * Authentication controller
 * Handles signup, login, and logout
 */

const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// signup new user
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Email already registered',
                    code: 'EMAIL_EXISTS'
                }
            });
        }

        // create user
        const user = await User.create({ name, email, password });

        // generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// login user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Please provide email and password',
                    code: 'MISSING_FIELDS'
                }
            });
        }

        // find user and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid credentials',
                    code: 'INVALID_CREDENTIALS'
                }
            });
        }

        // check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid credentials',
                    code: 'INVALID_CREDENTIALS'
                }
            });
        }

        // generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// logout - just returns success (token handled client-side)
const logout = async (req, res) => {
    res.json({
        success: true,
        data: {
            message: 'Logged out successfully'
        }
    });
};

module.exports = {
    signup,
    login,
    logout
};
