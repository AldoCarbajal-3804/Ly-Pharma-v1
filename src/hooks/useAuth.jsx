import { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { login as loginApi, logout as logoutApi, logoutBeacon } from '../services/authService';
import { getProfile } from '../services/perfilService';

function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return {};
    }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const id_sesion = localStorage.getItem('id_sesion');
        const id_empleado = localStorage.getItem('id_empleado');
        const profile = localStorage.getItem('profile');
        if (token && profile) {
            return { token, role, id_sesion, id_empleado: id_empleado || undefined, ...JSON.parse(profile) };
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
        queryClient.clear();
        const data = await loginApi(username, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('id_sesion', String(data.id_sesion ?? ''));
        const decoded = decodeToken(data.token);
        const id_empleado = decoded.id_empleado;
        if (id_empleado) localStorage.setItem('id_empleado', String(id_empleado));
        const profile = await getProfile(data.token);
        localStorage.setItem('profile', JSON.stringify(profile));
        setUser({ token: data.token, role: data.role, id_sesion: data.id_sesion, id_empleado, ...profile });
    };

    const logout = async () => {
        try {
            if (user?.token) await logoutApi(user.token);
        } catch (e) {
            console.error('Error en logout:', e);
        } finally {
            queryClient.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('id_sesion');
            localStorage.removeItem('id_empleado');
            localStorage.removeItem('profile');
            setUser(null);
        }
    };

    const updateProfile = async () => {
        if (!user?.token) return;
        const profile = await getProfile(user.token);
        localStorage.setItem('profile', JSON.stringify(profile));
        setUser((prev) => ({ ...prev, ...profile }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
}
