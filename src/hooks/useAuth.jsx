import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, logoutBeacon } from '../services/authService';
import { getProfile } from '../services/perfilService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const profile = localStorage.getItem('profile');
        if (token && profile) {
            return { token, ...JSON.parse(profile) };
        }
        return token ? { token } : null;
    });

    useEffect(() => {
        const handleUnload = () => {
            const token = localStorage.getItem('token');
            if (token) logoutBeacon(token);
        };
        window.addEventListener('beforeunload', handleUnload);

        const handleForceLogout = () => {
            const token = localStorage.getItem('token');
            if (token) {
                logoutBeacon(token);
                setTimeout(() => window.electronAPI?.logoutDone(), 2000);
            } else {
                window.electronAPI?.logoutDone();
            }
        };
        const cleanupIpc = window.electronAPI?.onForceLogout(handleForceLogout);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            cleanupIpc?.();
        };
    }, []);

    const login = async (username, password) => {
        const data = await loginApi(username, password);
        localStorage.setItem('token', data.token);
        const profile = await getProfile(data.token);
        localStorage.setItem('profile', JSON.stringify(profile));
        setUser({ token: data.token, ...profile });
    };

    const logout = async () => {
        try {
            if (user?.token) await logoutApi(user.token);
        } catch (e) {
            console.error('Error en logout:', e);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
}
