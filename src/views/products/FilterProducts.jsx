import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCategoria, getTipos } from "../../services/categoriaServices";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const FilterProducts = ({ filters, onFilterChange, onClear }) => {
    const { user } = useAuth();
    const [categorias, setCategorias] = useState([]);
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        if (!user?.token) return;
        Promise.all([
            getCategoria(user.token),
            getTipos(user.token),
        ])
            .then(([cats, tips]) => {
                setCategorias(cats);
                setTipos(tips);
            })
            .catch(console.error);
    }, [user?.token]);

    return (
        <section className="mb-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Filtros</h3>

            <div className="flex gap-4 items-end">
                <fieldset className="border border-gray-200 rounded-xl p-4 flex-1">
                    <legend className="text-xs font-semibold text-gray-500 px-1">Filtrar</legend>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Categoría</label>
                            <select
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm"
                                value={filters.categoria}
                                onChange={(e) => onFilterChange("categoria", e.target.value)}
                            >
                                <option value="">Todas las categorías</option>
                                {categorias.map((c) => (
                                    <option key={c.nombre} value={c.nombre}>{capitalize(c.nombre)}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Tipo</label>
                            <select
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm"
                                value={filters.tipo}
                                onChange={(e) => onFilterChange("tipo", e.target.value)}
                            >
                                <option value="">Todos los tipos</option>
                                {tipos.map((t) => (
                                    <option key={t.nombre} value={t.nombre}>{capitalize(t.nombre)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border border-gray-200 rounded-xl p-4 flex-1">
                    <legend className="text-xs font-semibold text-gray-500 px-1">Ordenar</legend>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Stock</label>
                            <select
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm"
                                value={filters.stock}
                                onChange={(e) => onFilterChange("stock", e.target.value)}
                            >
                                <option value="">Sin orden</option>
                                <option value="desc">Mayor stock</option>
                                <option value="asc">Menor stock</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-medium text-gray-600">Vencimiento</label>
                            <select
                                className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm"
                                value={filters.vencimiento}
                                onChange={(e) => onFilterChange("vencimiento", e.target.value)}
                            >
                                <option value="">Sin orden</option>
                                <option value="asc">Más próximos</option>
                                <option value="desc">Más lejanos</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <button
                    className="px-5 py-2.5 text-sm font-medium text-white bg-green-800 rounded-xl hover:bg-green-700 transition-colors cursor-pointer h-[42px]"
                    onClick={onClear}
                >
                    Limpiar filtros
                </button>
            </div>
        </section>
    );
};
