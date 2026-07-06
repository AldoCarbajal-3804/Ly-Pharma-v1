import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getGanancias, getRankingEmpleados, getPorcentajeProductos, getPorcentajeVentas } from "../../services/reportService"
import { BarChartCard } from "../../components/charts/BarChartCard"
import { PieChartCard } from "../../components/charts/PieChartCard"
import { RankingCard } from "../../components/charts/RankingCard"

const PERIODOS = ["dia", "semana", "mes", "anio"]
const LABELS = { dia: "Día", semana: "Semana", mes: "Mes", anio: "Año" }

function AdminReportes() {
    const { user } = useAuth()

    const { data: gananciasByPeriodo = [] } = useQuery({
        queryKey: ["reportes", "ganancias"],
        queryFn: async () => {
            const results = await Promise.all(
                PERIODOS.map((p) => getGanancias(user.token, p))
            )
            return results.map((r, i) => ({
                primary: LABELS[PERIODOS[i]],
                secondary: r.total_ganancias,
                ventas: r.total_ventas,
            }))
        },
        enabled: !!user?.token,
    })

    const { data: ranking = [] } = useQuery({
        queryKey: ["reportes", "ranking"],
        queryFn: () => getRankingEmpleados(user.token, 10),
        enabled: !!user?.token,
    })

    const { data: pctProductos } = useQuery({
        queryKey: ["reportes", "pct-productos"],
        queryFn: () => getPorcentajeProductos(user.token),
        enabled: !!user?.token,
    })

    const { data: pctVentas } = useQuery({
        queryKey: ["reportes", "pct-ventas"],
        queryFn: () => getPorcentajeVentas(user.token),
        enabled: !!user?.token,
    })

    return (
        <main className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Reportes</h1>
                <p className="text-sm text-gray-500">Panel de reportes administrativos</p>
            </div>

            <BarChartCard title="Ganancias por Periodo" data={gananciasByPeriodo} />

            <RankingCard title="Ranking de Empleados" data={ranking} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PieChartCard
                    title="% Productos por Proveedor"
                    data={pctProductos?.por_proveedor ?? []}
                />
                <PieChartCard
                    title="% Productos por Categoría"
                    data={pctProductos?.por_categoria ?? []}
                />
                <PieChartCard
                    title="% Productos por Tipo"
                    data={pctProductos?.por_tipo ?? []}
                />
                <PieChartCard
                    title="% Ventas por Proveedor"
                    data={pctVentas?.por_proveedor ?? []}
                />
                <PieChartCard
                    title="% Ventas por Categoría"
                    data={pctVentas?.por_categoria ?? []}
                />
                <PieChartCard
                    title="% Ventas por Tipo"
                    data={pctVentas?.por_tipo ?? []}
                />
            </div>
        </main>
    )
}

export default AdminReportes
