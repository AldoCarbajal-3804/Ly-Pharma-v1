import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { addProduct, editProduct } from "../../services/productService";
import { getCategoria, getTipos, getProveedores } from "../../services/categoriaServices";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const toDateInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
};

const buildForm = (product) => product ? {
    nombre: product.name || "",
    descripcion: "",
    precio_unitario: product.price ?? "",
    stock: product.stock ?? "",
    proveedor: product.provider || "",
    categoria: product.category || "",
    tipo: product.type || "",
    fecha_vencimiento: toDateInput(product["date-expire"]),
    detalles: "",
} : {
    nombre: "",
    descripcion: "",
    precio_unitario: "",
    stock: "",
    proveedor: "",
    categoria: "",
    tipo: "",
    fecha_vencimiento: "",
    detalles: "",
};

export const AddProduct = ({ product, onClose }) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const isEditing = !!product;
    const [form, setForm] = useState(() => buildForm(product));
    const [categorias, setCategorias] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        if (!user?.token) return;
        Promise.all([
            getCategoria(user.token),
            getTipos(user.token),
            getProveedores(user.token),
        ])
            .then(([cats, tips, provs]) => {
                setCategorias(cats);
                setTipos(tips);
                setProveedores(provs);
            })
            .catch(console.error);
    }, [user?.token]);

    const mutation = useMutation({
        mutationFn: () => {
            const body = {
                nombre: form.nombre,
                descripcion: form.descripcion || "",
                precio_unitario: Number(form.precio_unitario),
                stock: Number(form.stock),
                proveedor: form.proveedor,
                categoria: form.categoria,
                tipo: form.tipo,
                fecha_vencimiento: form.fecha_vencimiento,
                detalles: form.detalles || "",
            };
            return isEditing
                ? editProduct(user.token, body, product.id)
                : addProduct(user.token, body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productos"] });
            onClose();
        },
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
    };

    const isValid = form.nombre && form.precio_unitario && form.stock && form.proveedor && form.categoria && form.tipo && form.fecha_vencimiento;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 pb-0">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{isEditing ? "Editar producto" : "Nuevo producto"}</h3>
                        <p className="text-sm text-gray-500">{isEditing ? "Modifica los datos del producto" : "Completa los datos del producto"}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ej. Paracetamol 500mg"
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción del producto"
                                rows="2"
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Precio unitario *</label>
                            <input
                                type="number"
                                name="precio_unitario"
                                value={form.precio_unitario}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                min="0"
                                step="1"
                                placeholder="0"
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Proveedor *</label>
                            <select
                                name="proveedor"
                                value={form.proveedor}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            >
                                <option value="">Seleccionar</option>
                                {proveedores.map((p) => (
                                    <option key={p.nombre_empresa} value={p.nombre_empresa}>{p.nombre_empresa}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Categoría *</label>
                            <select
                                name="categoria"
                                value={form.categoria}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            >
                                <option value="">Seleccionar</option>
                                {categorias.map((c) => (
                                    <option key={c.nombre} value={c.nombre}>{capitalize(c.nombre)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Tipo *</label>
                            <select
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            >
                                <option value="">Seleccionar</option>
                                {tipos.map((t) => (
                                    <option key={t.nombre} value={t.nombre}>{capitalize(t.nombre)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Fecha de vencimiento *</label>
                            <input
                                type="date"
                                name="fecha_vencimiento"
                                value={form.fecha_vencimiento}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Detalles</label>
                            <input
                                type="text"
                                name="detalles"
                                value={form.detalles}
                                onChange={handleChange}
                                placeholder="Ej. Lote 34"
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            />
                        </div>
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
                            disabled={!isValid || mutation.isPending}
                            className="px-5 py-2 text-sm font-semibold text-white bg-green-800 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            {mutation.isPending ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar producto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
