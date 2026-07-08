import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getRankingEmpleados, getPorcentajeProductos, getPorcentajeVentas } from "../../services/reportService"
import { GananciasCard } from "../../components/charts/GananciasCard"
import { PieChartCard } from "../../components/charts/PieChartCard"
import { RankingCard } from "../../components/charts/RankingCard"

function AdminReportes() {
    const { user } = useAuth()

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

            <GananciasCard title="Ganancias" showAnio />

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
