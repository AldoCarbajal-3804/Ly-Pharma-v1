import { URL } from "../variables";
const BASE = `${URL}/reportes`;

function queryString(params = {}) {
    const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "");
    if (!entries.length) return "";
    return "?" + new URLSearchParams(entries).toString();
}

export async function getGanancias(token, periodo = "dia", idEmpleado) {
    const res = await fetch(`${BASE}/ganancias/${periodo}${queryString({ id_empleado: idEmpleado })}`, {
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

export async function getProductosMasVendidos(token, limite = 10, idEmpleado) {
    const res = await fetch(`${BASE}/productos-mas-vendidos${queryString({ limite, id_empleado: idEmpleado })}`, {
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

export async function getPorcentajeVentas(token, idEmpleado) {
    const res = await fetch(`${BASE}/porcentaje-ventas${queryString({ id_empleado: idEmpleado })}`, {
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
