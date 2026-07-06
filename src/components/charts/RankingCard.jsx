const MEDALS = ["🥇", "🥈", "🥉"]

export function RankingCard({ title, data }) {
    if (!data || data.length === 0) {
        return (
            <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-sm text-gray-400 text-center py-8">Sin datos disponibles</p>
            </article>
        )
    }

    const maxGanancias = Math.max(...data.map((e) => e.total_ganancias), 1)
    const maxVentas = Math.max(...data.map((e) => e.total_ventas), 1)

    return (
        <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left py-2 pr-2 text-xs font-bold text-gray-400 uppercase tracking-wider">#</th>
                            <th className="text-left py-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Empleado</th>
                            <th className="text-center py-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Ventas</th>
                            <th className="text-center py-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Ganancias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e, i) => (
                            <tr key={e.id_empleado ?? i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="py-3 pr-2 text-center text-lg">
                                    {i < 3 ? MEDALS[i] : <span className="text-gray-400 text-sm font-medium">{i + 1}</span>}
                                </td>
                                <td className="py-3 px-2">
                                    <p className="font-medium text-gray-800">{e.nombres} {e.apellidos}</p>
                                </td>
                                <td className="py-3 px-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all"
                                                style={{ width: `${(e.total_ventas / maxVentas) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 w-8 text-right">{e.total_ventas}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-700 rounded-full transition-all"
                                                style={{ width: `${(e.total_ganancias / maxGanancias) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 w-16 text-right">S/{e.total_ganancias.toFixed(2)}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    )
}
