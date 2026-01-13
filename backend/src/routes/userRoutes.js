/*
 * User routes
 * Profile management endpoints
 */

const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// all routes here require authentication
router.use(protect);

// GET /api/users/profile
router.get('/profile', getProfile);

// PUT /api/users/profile
router.put('/profile', updateProfile);

// DELETE /api/users/profile
router.delete('/profile', deleteProfile);

module.exports = router;
