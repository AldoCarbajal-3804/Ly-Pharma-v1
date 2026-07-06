export function TopProductsCard({ title, data }) {
    if (!data || data.length === 0) {
        return (
            <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-sm text-gray-400 text-center py-8">Sin datos disponibles</p>
            </article>
        )
    }

    const maxVendido = Math.max(...data.map((p) => p.total_vendido), 1)

    return (
        <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left py-2 pr-2 text-xs font-bold text-gray-400 uppercase tracking-wider">#</th>
                            <th className="text-left py-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Producto</th>
                            <th className="text-center py-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Vendido</th>
                            <th className="text-right py-2 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Ingresos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((p, i) => (
                            <tr key={p.id_producto ?? i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="py-3 pr-2 text-center text-sm font-medium text-gray-400">{i + 1}</td>
                                <td className="py-3 px-2">
                                    <p className="font-medium text-gray-800">{p.nombre}</p>
                                </td>
                                <td className="py-3 px-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all"
                                                style={{ width: `${(p.total_vendido / maxVendido) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 w-6 text-right">{p.total_vendido}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-right font-semibold text-gray-800">
                                    S/{p.total_ingresos.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    )
}
