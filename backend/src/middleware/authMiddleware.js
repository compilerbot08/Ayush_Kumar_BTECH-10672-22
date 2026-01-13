/*
 * Auth middleware
 * Protects routes that require authentication
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                message: 'Not authorized to access this route',
                code: 'NO_TOKEN'
            }
        });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // get user from token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'User no longer exists',
                    code: 'USER_NOT_FOUND'
                }
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: {
                message: 'Token is invalid or expired',
                code: 'INVALID_TOKEN'
            }
        });
    }
};

module.exports = { protect };
