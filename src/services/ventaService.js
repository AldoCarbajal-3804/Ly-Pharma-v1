import { URL } from "../variables";
const API_URL = `${URL}/ventas`;

export async function getVentas(token) {
    
    const res = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error en el envio de token');
    return data;

}

export async function getVentasId(token,id) {
    
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error en el envio de token');
    return data;
}

export async function addVentas(token,venta) {

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(venta)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al crear la venta');
    return data;
   
}

export async function listEmpleadoVentas(token, id) {

    const res = await fetch(`${API_URL}?id_empleado=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error en el envio de token');
    return data;

}