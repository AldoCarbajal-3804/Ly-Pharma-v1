import { URL } from "../variables";
const API_URL = `${URL}/ventas`;

function queryString(params = {}) {
    const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "");
    if (!entries.length) return "";
    return "?" + new URLSearchParams(entries).toString();
}

export async function getVentas(token, { limit, offset } = {}) {
    const res = await fetch(`${API_URL}${queryString({ limit, offset })}`, {
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

export async function getVentasId(token, id) {
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

export async function addVentas(token, venta) {
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

export async function listEmpleadoVentas(token, id, { limit, offset } = {}) {
    const res = await fetch(`${API_URL}${queryString({ id_empleado: id, limit, offset })}`, {
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