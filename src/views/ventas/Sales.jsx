import { useState } from "react";
import ventas from "../../data/ventas.json";
import { SalesTable } from "./SalesTable";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 6;

function Sales() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(ventas.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentSales = ventas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <main className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">

            <section aria-label="Resumen de ventas" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <article className="bg-white p-5 rounded-xl border border-gray-100">
                    <header className="mb-5 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">💰</div>
                        <span className="text-sm font-semibold text-emerald-600">+12.5%</span>
                    </header>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Ingresos por Productos</p>
                        <h2 className="mt-2 text-3xl font-bold text-gray-800">$12,450.00</h2>
                    </div>
                </article>

                <article className="bg-white p-5 rounded-xl border border-gray-100">
                    <header className="mb-5 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">🛒</div>
                        <span className="text-sm font-semibold text-emerald-600">+8.2%</span>
                    </header>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Volumen de Ventas</p>
                        <h2 className="mt-2 text-3xl font-bold text-gray-800">156 Unidades</h2>
                    </div>
                </article>
            </section>

            <section className="bg-white rounded-xl border border-gray-100">
                <header className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Historial de Ventas</h2>
                        <p className="text-sm text-gray-500">Registro reciente de ventas realizadas</p>
                    </div>

                    <nav aria-label="Acciones de ventas" className="flex flex-wrap gap-3">
                        <button className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                            Exportar
                        </button>
                        <button className="rounded-xl bg-green-800 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors">
                            Nueva Venta
                        </button>
                    </nav>
                </header>

                <SalesTable sales={currentSales} />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={ventas.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </section>
        </main>
    );
}

export default Sales;