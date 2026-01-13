/*
 * Task controller
 * Handles CRUD operations for tasks
 */

const Task = require('../models/Task');

// get all tasks for current user (with optional status filter)
const getTasks = async (req, res, next) => {
    try {
        const query = { user: req.user.id };

        // filter by status if provided
        if (req.query.status && ['pending', 'in-progress', 'completed'].includes(req.query.status)) {
            query.status = req.query.status;
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: {
                count: tasks.length,
                tasks
            }
        });
    } catch (error) {
        next(error);
    }
};

// get single task
const getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Task not found',
                    code: 'TASK_NOT_FOUND'
                }
            });
        }

        res.json({
            success: true,
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

// create new task
const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, status } = req.body;

        const task = await Task.create({
            title,
            description: description || '',
            dueDate,
            status: status || 'pending',
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

// update task
const updateTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, status } = req.body;

        let task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Task not found',
                    code: 'TASK_NOT_FOUND'
                }
            });
        }

        // update only provided fields
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (status !== undefined) task.status = status;

        await task.save();

        res.json({
            success: true,
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

// update just the status (for drag and drop)
const updateTaskStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!status || !['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Valid status is required (pending, in-progress, completed)',
                    code: 'INVALID_STATUS'
                }
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Task not found',
                    code: 'TASK_NOT_FOUND'
                }
            });
        }

        res.json({
            success: true,
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

// delete task
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Task not found',
                    code: 'TASK_NOT_FOUND'
                }
            });
        }

        res.json({
            success: true,
            data: {
                message: 'Task deleted successfully'
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
};
