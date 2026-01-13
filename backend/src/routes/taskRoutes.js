/*
 * Task routes
 * CRUD endpoints for tasks
 */

const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// all routes require authentication
router.use(protect);

// GET /api/tasks - get all tasks (optional ?status=pending)
router.get('/', getTasks);

// GET /api/tasks/:id - get single task
router.get('/:id', getTask);

// POST /api/tasks - create task
router.post('/', createTask);

// PUT /api/tasks/:id - update task
router.put('/:id', updateTask);

// PATCH /api/tasks/:id/status - update just the status
router.patch('/:id/status', updateTaskStatus);

// DELETE /api/tasks/:id - delete task
router.delete('/:id', deleteTask);

module.exports = router;
