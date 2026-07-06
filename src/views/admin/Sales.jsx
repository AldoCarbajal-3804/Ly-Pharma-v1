import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getVentas, listEmpleadoVentas } from "../../services/ventaService"
import { SalesTable } from "../ventas/SalesTable"
import { Pagination } from "../ventas/Pagination"
import { AddSale } from "../ventas/AddSale"
import { Ticket } from "../../components/Ticket"
import { ExcelTable } from "../../components/ExcelTable"

const ITEMS_PER_PAGE = 6

function AdminSales() {
    const { user } = useAuth()
    const [currentPage, setCurrentPage] = useState(1)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedSale, setSelectedSale] = useState(null)
    const [filterId, setFilterId] = useState("")

    const queryKey = filterId ? ["ventas", "empleado", filterId] : ["ventas"]

    const { data: ventas = [] } = useQuery({
        queryKey,
        queryFn: () => {
            if (filterId) return listEmpleadoVentas(user.token, filterId).then(r => r.data ?? r ?? [])
            return getVentas(user.token).then(r => r.data ?? r ?? [])
        },
        enabled: !!user?.token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

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
                        <p className="text-sm text-gray-500">
                            {filterId ? `Ventas del empleado #${filterId}` : "Registro de todas las ventas"}
                        </p>
                    </div>

                    <nav aria-label="Acciones de ventas" className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-medium text-gray-500">ID Empleado:</label>
                            <input
                                type="number"
                                value={filterId}
                                onChange={(e) => { setFilterId(e.target.value); setCurrentPage(1) }}
                                placeholder="Filtrar"
                                className="w-24 rounded-xl bg-gray-100 py-2 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                            />
                            {filterId && (
                                <button
                                    onClick={() => { setFilterId(""); setCurrentPage(1) }}
                                    className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                                >
                                    Limpiar
                                </button>
                            )}
                        </div>
                        <ExcelTable data={exportData} columns={exportColumns} filename={`Ventas${filterId ? `_empleado_${filterId}` : ""}`}>
                            Exportar
                        </ExcelTable>
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

export default AdminSales
