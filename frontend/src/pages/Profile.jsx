/*
 * Profile page
 */

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Profile.css';

function Profile() {
    const { user, updateUser, logout } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await api.put('/users/profile', formData);
            updateUser(res.data.data.user);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.error?.message || 'Update failed'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete('/users/profile');
            logout();
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.error?.message || 'Delete failed'
            });
        }
    };

    return (
        <div className="container">
            <div className="profile-page">
                <h1>Profile Settings</h1>

                <div className="profile-card">
                    <form onSubmit={handleSubmit} className="profile-form">
                        {message.text && (
                            <div className={`profile-message ${message.type}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    </form>
                </div>

                <div className="danger-zone">
                    <h2>Danger Zone</h2>
                    <p>Permanently delete your account and all data.</p>

                    {!showDelete ? (
                        <button
                            className="btn btn-danger"
                            onClick={() => setShowDelete(true)}
                        >
                            Delete Account
                        </button>
                    ) : (
                        <div className="delete-confirm">
                            <p>Are you sure? This cannot be undone.</p>
                            <div className="delete-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowDelete(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Yes, delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
