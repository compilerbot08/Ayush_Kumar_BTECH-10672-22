/*
 * Main layout with header
 */

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Layout.css';

function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            // ignore error, logout anyway
        }
        logout();
        navigate('/login');
    };

    return (
        <div className="layout">
            <header className="header">
                <div className="header-content container">
                    <Link to="/dashboard" className="logo">
                        Task Manager
                    </Link>

                    <nav className="nav">
                        <Link to="/dashboard" className="nav-link">Board</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <button onClick={handleLogout} className="nav-btn">
                            Logout
                        </button>
                    </nav>
                </div>
            </header>

            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
