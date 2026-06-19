import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { addVentas } from "../../services/ventaService"
import { getProductos } from "../../services/productService"
import close from "../../assets/icons/productos/close.svg"
import trash from "../../assets/icons/productos/trash.svg"

export const AddSale = ({ onClose }) => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const [cliente, setCliente] = useState({ nombres: "", apellidos: "", dni: "" })
    const [productos, setProductos] = useState([{ id_producto: "", cantidad: "" }])

    const { data: allProducts = [] } = useQuery({
        queryKey: ["productos", "all"],
        queryFn: () => getProductos(user.token, { limit: 1000, offset: 0 }),
        enabled: !!user?.token,
        staleTime: 5 * 60 * 1000,
        select: (res) => res.data ?? [],
    })

    const mutation = useMutation({
        mutationFn: () =>
            addVentas(user.token, {
                cliente: {
                    nombres: cliente.nombres,
                    apellidos: cliente.apellidos,
                    dni: cliente.dni,
                },
                productos: productos.map((p) => ({
                    id_producto: Number(p.id_producto),
                    cantidad: Number(p.cantidad),
                })),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ventas"] })
            onClose()
        },
    })

    const handleClienteChange = (e) => {
        setCliente((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleProductoChange = (index, field, value) => {
        setProductos((prev) =>
            prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
        )
    }

    const addProductoRow = () => {
        setProductos((prev) => [...prev, { id_producto: "", cantidad: "" }])
    }

    const removeProductoRow = (index) => {
        setProductos((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    const productoMap = Object.fromEntries(
        allProducts.map((p) => [p.id_producto, p])
    )

    const rows = productos.map((p) => {
        const prod = productoMap[p.id_producto]
        const precio = prod?.precio_unitario ?? 0
        const cantidad = Number(p.cantidad) || 0
        const subtotal = precio * cantidad
        return { ...p, prod, precio, subtotal }
    })

    const totalGeneral = rows.reduce((sum, r) => sum + r.subtotal, 0)
    const igv = totalGeneral * 0.18
    const totalConIgv = totalGeneral + igv

    const clienteValido = cliente.nombres && cliente.apellidos && cliente.dni
    const productosValidos = productos.every((p) => p.id_producto && p.cantidad)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 pb-0">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Nueva Venta</h3>
                        <p className="text-sm text-gray-500">Registra una nueva venta</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <img src={close} alt="Close" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">Datos del Cliente</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">Nombres *</label>
                                <input
                                    type="text"
                                    name="nombres"
                                    value={cliente.nombres}
                                    onChange={handleClienteChange}
                                    placeholder="Ej. Johan"
                                    className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">Apellidos *</label>
                                <input
                                    type="text"
                                    name="apellidos"
                                    value={cliente.apellidos}
                                    onChange={handleClienteChange}
                                    placeholder="Ej. Perez"
                                    className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">DNI *</label>
                                <input
                                    type="text"
                                    name="dni"
                                    value={cliente.dni}
                                    onChange={handleClienteChange}
                                    placeholder="Ej. 12345678"
                                    maxLength={8}
                                    className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-gray-700">Productos</h4>
                            <button
                                type="button"
                                onClick={addProductoRow}
                                className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-xl hover:bg-green-100 transition-colors cursor-pointer"
                            >
                                + Agregar producto
                            </button>
                        </div>

                        <div className="space-y-3">
                            {productos.map((p, i) => {
                                const row = rows[i]
                                return (
                                    <div key={i} className="flex items-end gap-2">
                                        <div className="flex-2">
                                            {i === 0 && <label className="mb-1 block text-xs font-medium text-gray-600">Producto *</label>}
                                            <select
                                                value={p.id_producto}
                                                onChange={(e) => handleProductoChange(i, "id_producto", e.target.value)}
                                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                                            >
                                                <option value="">Seleccionar producto</option>
                                                {allProducts.map((prod) => (
                                                    <option key={prod.id_producto} value={prod.id_producto}>
                                                        {prod.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-20">
                                            {i === 0 && <label className="mb-1 block text-xs font-medium text-gray-600">P.Unit</label>}
                                            <div className="w-full rounded-xl bg-gray-50 py-2.5 px-3 text-sm text-gray-600 border border-gray-200">
                                                {row.precio ? `S/${row.precio.toFixed(2)}` : "-"}
                                            </div>
                                        </div>
                                        <div className="w-20">
                                            {i === 0 && <label className="mb-1 block text-xs font-medium text-gray-600">Cant. *</label>}
                                            <input
                                                type="number"
                                                value={p.cantidad}
                                                onChange={(e) => handleProductoChange(i, "cantidad", e.target.value)}
                                                placeholder="0"
                                                min="1"
                                                step="1"
                                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                                            />
                                        </div>
                                        <div className="w-24">
                                            {i === 0 && <label className="mb-1 block text-xs font-medium text-gray-600">Subtotal</label>}
                                            <div className="w-full rounded-xl bg-green-50 py-2.5 px-3 text-sm font-semibold text-green-800 border border-green-200">
                                                {row.subtotal ? `S/${row.subtotal.toFixed(2)}` : "-"}
                                            </div>
                                        </div>
                                        {productos.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeProductoRow(i)}
                                                className="p-2.5 rounded-xl hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                                            >
                                                <img src={trash} alt="Eliminar" />
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {rows.some((r) => r.subtotal > 0) && (
                            <div className="flex justify-end border-t border-gray-200 pt-3">
                                <div className="w-56 space-y-1.5">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal:</span>
                                        <span>S/{totalGeneral.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>IGV (18%):</span>
                                        <span>S/{igv.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-200 pt-1.5">
                                        <span className="text-sm font-bold text-gray-700">Total:</span>
                                        <span className="text-lg font-bold text-green-800">S/{totalConIgv.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {mutation.isError && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{mutation.error.message}</p>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!clienteValido || !productosValidos || mutation.isPending}
                            className="px-5 py-2 text-sm font-semibold text-white bg-green-800 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            {mutation.isPending ? "Guardando..." : "Registrar Venta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
