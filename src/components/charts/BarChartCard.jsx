import { useMemo } from "react"
import { Chart } from "react-charts"

const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#047857", "#65d3a3"]

export function BarChartCard({ title, data, horizontal = false }) {
    const primaryAxis = useMemo(() => ({
        getValue: (d) => d.primary,
        ...(horizontal ? { position: "left" } : {}),
    }), [horizontal])

    const secondaryAxes = useMemo(() => [{
        getValue: (d) => d.secondary,
        elementType: "bar",
        min: 0,
    }], [])

    const chartData = useMemo(() => [{
        label: title,
        data: data ?? [],
    }], [title, data])

    return (
        <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
            {(!data || data.length === 0) ? (
                <p className="text-sm text-gray-400 text-center py-8">Sin datos disponibles</p>
            ) : (
                <div className="h-72">
                    <Chart options={{ data: chartData, primaryAxis, secondaryAxes }} />
                </div>
            )}
        </article>
    )
}
