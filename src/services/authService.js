
import { URL } from "../variables";
const API_URL = `${URL}/auth/`;

export async function login(username, password) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error en la autenticación');
    return data;
}

export async function logout(token) {
    const res = await fetch(API_URL,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token})
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error en cerrar sesión');
    return data;
}
