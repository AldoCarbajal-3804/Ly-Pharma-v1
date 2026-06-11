import { URL } from "../variables";
const API_URL = `${URL}/muestra/`;

export async function getMuestra(token) {
    
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
