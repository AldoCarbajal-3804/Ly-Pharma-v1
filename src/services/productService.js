import { URL } from "../variables";
const API_URL = `${URL}/productos/`;


export async function getProductos(token, { limit = 10, offset = 1, categoria, tipo, stock, vencimiento } = {}) {
    const params = new URLSearchParams({ limit, offset });
    if (categoria) params.append('categoria', categoria);
    if (tipo) params.append('tipo', tipo);
    if (stock) params.append('stock', stock);
    if (vencimiento) params.append('vencimiento', vencimiento);
    const res = await fetch(`${API_URL}?${params}`, {
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