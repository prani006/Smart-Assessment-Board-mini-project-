import { createContext, useState, useEffect } from 'react';
import api from '../api/config';

export const AuthContext = createContext();

const getInitialUser = () => {
    try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Auth Init Error:', error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialUser());
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            setLoading(false);
            return { success: true, role: res.data.role };
        } catch (error) {
            setLoading(false);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
