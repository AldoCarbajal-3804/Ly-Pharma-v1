import { useSesionesCache } from "../../cache/useSesionesCache"

function TableSessions() {
    const { data: sesiones = [], isLoading } = useSesionesCache()

    const formatDate = (val) => {
        if (!val) return "-"
        const d = new Date(val)
        return isNaN(d) ? val : d.toLocaleDateString("es-PE")
    }

    const formatTime = (val) => {
        if (!val) return "-"
        const d = new Date(val)
        return isNaN(d) ? val : d.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-2/3">
                <header className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg">Sesiones Recientes</h3>
                </header>
                <div className="p-6 text-center text-gray-400">Cargando sesiones...</div>
            </div>
        )
    }

    if (sesiones.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-2/3">
                <header className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg">Sesiones Recientes</h3>
                </header>
                <div className="p-6 text-center text-gray-400">Sin sesiones registradas</div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-2/3">
            <header className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg">Sesiones Recientes</h3>
                <span className="text-xs text-gray-400">{sesiones.length} sesiones</span>
            </header>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Usuario</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Hora Inicio</th>
                            <th className="px-6 py-4">Hora Final</th>
                            <th className="px-6 py-4">Min. Trabajados</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sesiones.map((row, i) => (
                            <tr key={row.id ?? i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{row.nombre || "-"}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(row.fecha)}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatTime(row.hora_inicio)}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatTime(row.hora_final)}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{row.minutos_trabajo ?? "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableSessions
