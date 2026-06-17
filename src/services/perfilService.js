
import { URL } from "../variables";
const API_URL = `${URL}/perfil`


export async function getProfile(token) {
    const res = await fetch(API_URL,{
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json' , 
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error en el envio de token');
    return data;
}

export async function unforgetPassword(username) {
    const res = await fetch(`${API_URL}/olvide-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al recibir el token de restablecimiento');
    return data;
}

export async function restablecePassowrd(rest) {
    const res = await fetch(`${API_URL}/restablecer-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al reestablecer el password');
    return data;
}

