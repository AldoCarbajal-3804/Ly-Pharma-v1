import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getGanancias } from "../../services/reportService"
import { BarChartCard } from "./BarChartCard"

const PERIODOS = [
    { value: "dia", label: "Día", keyField: "rango" },
    { value: "semana", label: "Semana", keyField: "dia" },
    { value: "mes", label: "Mes", keyField: "semana" },
    { value: "anio", label: "Año", keyField: "mes" },
]

export function GananciasCard({ title, showAnio = true, idEmpleado }) {
    const { user } = useAuth()
    const [periodo, setPeriodo] = useState("dia")

    const periodos = useMemo(() => showAnio ? PERIODOS : PERIODOS.slice(0, 3), [showAnio])

    const { data, isLoading } = useQuery({
        queryKey: ["reportes", "ganancias", periodo, idEmpleado],
        queryFn: () => getGanancias(user.token, periodo, idEmpleado),
        enabled: !!user?.token,
    })

    const chartData = useMemo(() => {
        if (!data?.detalle) return []
        const field = periodos.find((p) => p.value === periodo)?.keyField ?? "rango"
        return data.detalle.map((d) => ({
            primary: d[field],
            secondary: d.total_ganancias,
            ventas: d.total_ventas,
        }))
    }, [data, periodo, periodos])

    return (
        <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">{title}</h3>
                <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="rounded-xl bg-gray-100 py-2 px-3 outline-none text-gray-800 text-sm font-medium focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all cursor-pointer"
                >
                    {periodos.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <p className="text-sm text-gray-400 text-center py-8">Cargando...</p>
            ) : !data ? (
                <p className="text-sm text-gray-400 text-center py-8">Sin datos disponibles</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 rounded-xl p-4">
                            <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Total Ventas</p>
                            <p className="text-2xl font-bold text-emerald-800 mt-1">{data.total_ventas}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                            <p className="text-xs font-medium text-green-700 uppercase tracking-wider">Total Ganancias</p>
                            <p className="text-2xl font-bold text-green-800 mt-1">S/{data.total_ganancias?.toFixed(2)}</p>
                        </div>
                    </div>

                    {chartData.length > 0 && (
                        <BarChartCard
                            title={`Detalle por ${periodos.find((p) => p.value === periodo)?.label.toLowerCase()}`}
                            data={chartData}
                        />
                    )}
                </>
            )}
        </section>
    )
}
