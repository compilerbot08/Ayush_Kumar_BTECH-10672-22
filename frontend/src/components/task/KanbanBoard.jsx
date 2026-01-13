/*
 * Kanban board component
 * Three columns: Pending, In Progress, Completed
 */

import { useState } from 'react';
import TaskCard from './TaskCard';
import './KanbanBoard.css';

const columns = [
    { id: 'pending', title: 'Pending', color: 'var(--color-pending)' },
    { id: 'in-progress', title: 'In Progress', color: 'var(--color-inprogress)' },
    { id: 'completed', title: 'Completed', color: 'var(--color-completed)' }
];

function KanbanBoard({ tasks, onStatusChange, onEdit, onDelete }) {
    const [draggedTask, setDraggedTask] = useState(null);
    const [dragOverColumn, setDragOverColumn] = useState(null);

    const handleDragStart = (e, task) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setDraggedTask(null);
        setDragOverColumn(null);
    };

    const handleDragOver = (e, columnId) => {
        e.preventDefault();
        setDragOverColumn(columnId);
    };

    const handleDrop = (e, columnId) => {
        e.preventDefault();
        if (draggedTask && draggedTask.status !== columnId) {
            onStatusChange(draggedTask._id, columnId);
        }
        setDraggedTask(null);
        setDragOverColumn(null);
    };

    // group tasks by status
    const getTasksByStatus = (status) => {
        return tasks.filter(t => t.status === status);
    };

    return (
        <div className="kanban-board">
            {columns.map(column => (
                <div
                    key={column.id}
                    className={`kanban-column ${dragOverColumn === column.id ? 'drag-over' : ''}`}
                    onDragOver={(e) => handleDragOver(e, column.id)}
                    onDragLeave={() => setDragOverColumn(null)}
                    onDrop={(e) => handleDrop(e, column.id)}
                    style={{ '--column-color': column.color }}
                >
                    <div className="column-header">
                        <h3>{column.title}</h3>
                        <span className="task-count">{getTasksByStatus(column.id).length}</span>
                    </div>

                    <div className="column-tasks">
                        {getTasksByStatus(column.id).map(task => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onEdit={() => onEdit(task)}
                                onDelete={() => onDelete(task._id)}
                                isDragging={draggedTask?._id === task._id}
                            />
                        ))}

                        {getTasksByStatus(column.id).length === 0 && (
                            <div className="empty-column">
                                No tasks
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default KanbanBoard;
