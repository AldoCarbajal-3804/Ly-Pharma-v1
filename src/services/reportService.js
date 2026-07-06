import { URL } from "../variables";
const BASE = `${URL}/reportes`;

export async function getGanancias(token, periodo = "dia") {
    const res = await fetch(`${BASE}/ganancias?periodo=${periodo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener ganancias');
    return data;
}

export async function getRankingEmpleados(token, limite = 10) {
    const res = await fetch(`${BASE}/ranking-empleados?limite=${limite}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener ranking');
    return data;
}

export async function getProductosMasVendidos(token, limite = 10) {
    const res = await fetch(`${BASE}/productos-mas-vendidos?limite=${limite}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener productos más vendidos');
    return data;
}

export async function getPorcentajeProductos(token) {
    const res = await fetch(`${BASE}/porcentaje-productos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener porcentaje de productos');
    return data;
}

export async function getPorcentajeVentas(token) {
    const res = await fetch(`${BASE}/porcentaje-ventas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener porcentaje de ventas');
    return data;
}
