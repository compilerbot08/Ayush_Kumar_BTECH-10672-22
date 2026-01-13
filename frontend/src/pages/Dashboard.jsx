/*
 * Dashboard page with Kanban board
 */

import { useState, useEffect } from 'react';
import api from '../services/api';
import KanbanBoard from '../components/task/KanbanBoard';
import TaskModal from '../components/task/TaskModal';
import './Dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState(null);

    // fetch tasks
    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data.data.tasks);
            setError('');
        } catch (err) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // handle status change (drag and drop)
    const handleStatusChange = async (taskId, newStatus) => {
        // optimistic update
        setTasks(prev => prev.map(t =>
            t._id === taskId ? { ...t, status: newStatus } : t
        ));

        try {
            await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
        } catch (err) {
            // revert on error
            fetchTasks();
        }
    };

    // handle create task
    const handleCreate = async (taskData) => {
        try {
            const res = await api.post('/tasks', taskData);
            setTasks(prev => [res.data.data.task, ...prev]);
            setShowModal(false);
        } catch (err) {
            throw err;
        }
    };

    // handle update task
    const handleUpdate = async (taskData) => {
        try {
            const res = await api.put(`/tasks/${editTask._id}`, taskData);
            setTasks(prev => prev.map(t =>
                t._id === editTask._id ? res.data.data.task : t
            ));
            setEditTask(null);
            setShowModal(false);
        } catch (err) {
            throw err;
        }
    };

    // handle delete task
    const handleDelete = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(prev => prev.filter(t => t._id !== taskId));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    // open edit modal
    const openEdit = (task) => {
        setEditTask(task);
        setShowModal(true);
    };

    // close modal
    const closeModal = () => {
        setShowModal(false);
        setEditTask(null);
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Loading tasks...</div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Task Board</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Task
                    </button>
                </div>

                {error && <div className="dashboard-error">{error}</div>}

                <KanbanBoard
                    tasks={tasks}
                    onStatusChange={handleStatusChange}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                />
            </div>

            {showModal && (
                <TaskModal
                    task={editTask}
                    onSubmit={editTask ? handleUpdate : handleCreate}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

export default Dashboard;
