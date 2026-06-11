import { useState, useCallback } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { getProductos } from "../../services/productService";
import { FilterProducts } from "./FilterProducts";
import { ProductTable } from "./ProductTable";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 10;

function Products() {
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
            offset: currentPage,
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
            totalPages: Math.ceil(res.total / ITEMS_PER_PAGE),
        }),
    });

    return (
        <main className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            <FilterProducts filters={filters} onFilterChange={handleFilterChange} onClear={handleClear} />
            <br />
            <ProductTable products={data?.products ?? []} />

            <Pagination
                currentPage={currentPage}
                totalPages={data?.totalPages ?? 0}
                onPageChange={setCurrentPage}
            />
        </main>
    );

}

export default Products;