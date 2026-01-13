/*
 * Main App component with routing
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';

// protected route wrapper
function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
}

// redirect if already logged in
function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return user ? <Navigate to="/dashboard" /> : children;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={
                        <PublicRoute><Login /></PublicRoute>
                    } />
                    <Route path="/signup" element={
                        <PublicRoute><Signup /></PublicRoute>
                    } />
                    <Route path="/" element={
                        <PrivateRoute><Layout /></PrivateRoute>
                    }>
                        <Route index element={<Navigate to="/dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
