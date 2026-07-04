import { useState, useCallback } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { getProductos } from "../../services/productService";
import { FilterProducts } from "../products/FilterProducts";
import { ProductTableSimple } from "../products/ProductTableSimple";
import { Pagination } from "../products/Pagination";

const ITEMS_PER_PAGE = 10;

function EmpleadoProducts() {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ categoria: "", tipo: "", stock: "", vencimiento: "" });

    const handleFilterChange = useCallback((key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    }, []);

    const handleClear = useCallback(() => {
        setFilters({ categoria: "", tipo: "", stock: "", vencimiento: "" });
        setCurrentPage(1);
    }, []);

    const { data } = useQuery({
        queryKey: ["productos", filters, currentPage],
        queryFn: () => getProductos(user.token, {
            limit: ITEMS_PER_PAGE,
            offset: (currentPage - 1) * ITEMS_PER_PAGE,
            categoria: filters.categoria || undefined,
            tipo: filters.tipo || undefined,
            stock: filters.stock || undefined,
            vencimiento: filters.vencimiento || undefined,
        }),
        placeholderData: keepPreviousData,
        enabled: !!user?.token,
        select: (res) => ({
            products: res.data.map((p) => ({
                id: p.id_producto,
                name: p.nombre,
                category: p.categoria,
                type: p.tipo,
                stock: p.stock,
                price: p.precio_unitario,
                provider: p.proveedor,
                "date-expire": p.fecha_vencimiento,
            })),
            total: res.total,
        }),
    });

    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <section className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Productos</h2>
            </div>

            <FilterProducts filters={filters} onFilterChange={handleFilterChange} onClear={handleClear} />
            <ProductTableSimple products={data?.products ?? []} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                total={total}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />
        </section>
    );

}

export default EmpleadoProducts;
