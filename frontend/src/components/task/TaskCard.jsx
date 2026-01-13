/*
 * Task card component
 * Displays task info and handles drag events
 */

import './TaskCard.css';

function TaskCard({ task, onDragStart, onDragEnd, onEdit, onDelete, isDragging }) {
    // format due date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = date - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days < 0) return 'Overdue';
        if (days === 0) return 'Today';
        if (days === 1) return 'Tomorrow';

        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
        });
    };

    // check if overdue
    const isOverdue = () => {
        return new Date(task.dueDate) < new Date() && task.status !== 'completed';
    };

    return (
        <div
            className={`task-card ${isDragging ? 'dragging' : ''} ${isOverdue() ? 'overdue' : ''}`}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onDragEnd={onDragEnd}
        >
            <div className="task-header">
                <h4 className="task-title">{task.title}</h4>
                <div className="task-actions">
                    <button onClick={onEdit} className="action-btn" title="Edit">
                        ✎
                    </button>
                    <button onClick={onDelete} className="action-btn delete" title="Delete">
                        ×
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="task-desc">{task.description}</p>
            )}

            <div className="task-footer">
                <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
                    📅 {formatDate(task.dueDate)}
                </span>
            </div>
        </div>
    );
}

export default TaskCard;
