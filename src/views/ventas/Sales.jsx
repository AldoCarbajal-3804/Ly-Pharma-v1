import { useState } from "react"
import { SalesTable } from "./SalesTable"
import { Pagination } from "./Pagination"
import { AddSale } from "./AddSale"
import { Ticket } from "../../components/Ticket"
import { ExcelTable } from "../../components/ExcelTable"
import { useVentasCache } from "../../cache/useVentasCache"

const ITEMS_PER_PAGE = 6

function Sales() {
    const [currentPage, setCurrentPage] = useState(1)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedSale, setSelectedSale] = useState(null)

    const { data: ventas = [] } = useVentasCache()

    const totalPages = Math.ceil(ventas.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentSales = ventas.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const exportColumns = [
        { label: "N° Venta", value: "id", width: 12 },
        { label: "Cliente", value: "cliente", width: 30 },
        { label: "DNI", value: "dni", width: 15 },
        { label: "Fecha", value: "fecha", width: 15 },
        { label: "Hora", value: "hora", width: 10 },
        { label: "Total (S/)", value: "total", width: 15 },
    ]

    const exportData = ventas.map((sale) => {
        const isObj = typeof sale.cliente === "object" && sale.cliente
        const fecha = sale.fecha ?? sale.date ?? sale.fecha_venta ?? ""
        const total = sale.total ?? sale.monto_total ?? 0
        return {
            id: sale.id_venta ?? sale.id ?? "",
            cliente: isObj ? `${sale.cliente.nombres || ""} ${sale.cliente.apellidos || ""}`.trim() : sale.cliente || "-",
            dni: isObj ? sale.cliente.dni || "" : "",
            fecha: fecha ? new Date(fecha).toLocaleDateString("es-PE") : "",
            hora: fecha ? new Date(fecha).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }) : "",
            total: typeof total === "number" ? total : parseFloat(String(total).replace(/[^0-9.]/g, "")) || 0,
        }
    })

    return (
        <main className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            {showAddModal && <AddSale onClose={() => setShowAddModal(false)} />}
            {selectedSale && <Ticket sale={selectedSale} onClose={() => setSelectedSale(null)} />}

            <section className="bg-white rounded-xl border border-gray-100">
                <header className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Historial de Ventas</h2>
                        <p className="text-sm text-gray-500">Registro reciente de ventas realizadas</p>
                    </div>

                    <nav aria-label="Acciones de ventas" className="flex flex-wrap gap-3">
                        <ExcelTable data={exportData} columns={exportColumns} filename="Ventas">
                            Exportar
                        </ExcelTable>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="rounded-xl bg-green-800 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors cursor-pointer"
                        >
                            Nueva Venta
                        </button>
                    </nav>
                </header>

                <SalesTable sales={currentSales} onView={setSelectedSale} />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={ventas.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </section>
        </main>
    )
}

export default Sales