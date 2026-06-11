import { URL } from "../variables";
const API_URL1 = `${URL}/categorias`;
const API_URL2 = `${URL}/tipos`;
const API_URL3 = `${URL}/proveedores`;


export async function getCategoria(token) {
    
    const res = await fetch(API_URL1,{
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

export async function getTipos(token) {
    
    const res = await fetch(API_URL2,{
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

export async function getProveedores(token) {
    
    const res = await fetch(API_URL3,{
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