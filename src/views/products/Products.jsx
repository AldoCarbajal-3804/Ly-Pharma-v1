import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { getProductos, deleteProduct } from "../../services/productService";
import { FilterProducts } from "./FilterProducts";
import { AddProduct } from "./AddProduct";
import { ProductTable } from "./ProductTable";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 10;

function Products() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ categoria: "", tipo: "", stock: "", vencimiento: "" });
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

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

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteProduct(user.token, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productos"] });
            queryClient.invalidateQueries({ queryKey: ["muestra"] });
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
        },
    });

    const handleEdit = useCallback((product) => {
        setEditingProduct(product);
    }, []);

    const handleDelete = useCallback((product) => {
        if (window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) {
            deleteMutation.mutate(product.id);
        }
    }, [deleteMutation]);

    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <section className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Productos</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-green-800 rounded-xl hover:bg-green-700 transition-colors cursor-pointer"
                >
                    + Nuevo producto
                </button>
            </div>

            {showAddModal && <AddProduct onClose={() => setShowAddModal(false)} />}
            {editingProduct && <AddProduct product={editingProduct} onClose={() => setEditingProduct(null)} />}

            {deleteMutation.isError && (
                <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                    {deleteMutation.error.message}
                </div>
            )}

            <FilterProducts filters={filters} onFilterChange={handleFilterChange} onClear={handleClear} />
            <ProductTable products={data?.products ?? []} onEdit={handleEdit} onDelete={handleDelete} />

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

export default Products;
