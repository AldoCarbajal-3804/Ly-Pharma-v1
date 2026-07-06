const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#047857", "#65d3a3", "#e11d48", "#f97316", "#eab308"]

export function PieChartCard({ title, data }) {
    if (!data || data.length === 0) {
        return (
            <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-sm text-gray-400 text-center py-8">Sin datos disponibles</p>
            </article>
        )
    }

    const total = data.reduce((sum, d) => sum + d.total, 0)
    let cumulative = 0

    return (
        <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
            <div className="flex items-center gap-6">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    {data.map((d, i) => {
                        const pct = d.total / total
                        const angle = pct * 360
                        const offset = (cumulative / 100) * 360
                        cumulative += pct * 100
                        return (
                            <circle
                                key={i}
                                cx="70"
                                cy="70"
                                r="60"
                                fill="none"
                                stroke={COLORS[i % COLORS.length]}
                                strokeWidth="20"
                                strokeDasharray={`${angle} ${360 - angle}`}
                                strokeDashoffset={-offset}
                                transform="rotate(-90 70 70)"
                                style={{ transition: "stroke-dasharray 0.5s" }}
                            />
                        )
                    })}
                    <circle cx="70" cy="70" r="45" fill="white" />
                    <text x="70" y="70" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-gray-800">
                        {total}
                    </text>
                </svg>
                <div className="flex flex-col gap-1.5 text-sm">
                    {data.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                            <span className="text-gray-600">{d.nombre}</span>
                            <span className="text-gray-800 font-semibold ml-auto">{d.porcentaje?.toFixed(1) ?? ((d.total / total) * 100).toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
