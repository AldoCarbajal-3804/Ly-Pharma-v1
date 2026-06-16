import ver from "../../assets/icons/ventas/ver.svg"
import trash from "../../assets/icons/productos/trash.svg"

export const SalesTable = ({ sales }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "-"
        const date = new Date(dateStr)
        if (isNaN(date)) return dateStr
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
    }

    const formatHour = (dateStr) => {
        if (!dateStr) return "-"
        const date = new Date(dateStr)
        if (isNaN(date)) return "-"
        return date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
    }

    const getClientName = (sale) => {
        if (typeof sale.cliente === "object" && sale.cliente) {
            return `${sale.cliente.nombres || ""} ${sale.cliente.apellidos || ""}`.trim()
        }
        return sale.cliente || sale.client || "-"
    }


    const getDate = (sale) => sale.fecha ?? sale.date ?? sale.fecha_venta ?? ""

    const getTotal = (sale) => {
        const val = sale.total ?? sale.monto_total ?? 0
        const num = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.]/g, ""))
        if (isNaN(num)) return val
        return `S/${num.toFixed(2)}`
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Fecha</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Hora</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-8 text-center text-gray-400 text-sm">Sin ventas registradas</td>
                        </tr>
                    ) : sales.map((sale, i) => (
                        <tr key={sale.id_venta ?? sale.id ?? i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            
                            <td className="py-3 px-2">
                                <p className="font-medium text-gray-800">{getClientName(sale)}</p>
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600">{formatDate(getDate(sale))}</td>
                            <td className="py-3 px-2 text-sm text-gray-600">{formatHour(getDate(sale))}</td>
                            
                            <td className="py-3 px-2">
                                <span className="font-bold text-gray-800">{getTotal(sale)}</span>
                            </td>
                            <td className="py-3 px-2">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer" title="Ver">
                                        <img src={ver} alt="Ver" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors cursor-pointer" title="Eliminar">
                                        <img src={trash} alt="Eliminar" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
