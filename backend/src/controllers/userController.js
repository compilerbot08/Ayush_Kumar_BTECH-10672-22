/*
 * User controller
 * Handles profile operations
 */

const User = require('../models/User');

// get current user profile
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// update user profile
const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        // build update object
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        // check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Email is already in use',
                        code: 'EMAIL_EXISTS'
                    }
                });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// delete user account
const deleteProfile = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user.id);

        res.json({
            success: true,
            data: {
                message: 'Account deleted successfully'
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
};
