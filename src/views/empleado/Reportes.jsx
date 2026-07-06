import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getGanancias, getProductosMasVendidos, getPorcentajeVentas } from "../../services/reportService"
import { BarChartCard } from "../../components/charts/BarChartCard"
import { PieChartCard } from "../../components/charts/PieChartCard"
import { TopProductsCard } from "../../components/charts/TopProductsCard"

const PERIODOS = ["dia", "semana", "mes"]
const LABELS = { dia: "Día", semana: "Semana", mes: "Mes" }

function EmpleadoReportes() {
    const { user } = useAuth()

    const { data: gananciasByPeriodo = [] } = useQuery({
        queryKey: ["reportes", "ganancias", "empleado"],
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

    const { data: masVendidos = [] } = useQuery({
        queryKey: ["reportes", "mas-vendidos"],
        queryFn: () => getProductosMasVendidos(user.token, 10),
        enabled: !!user?.token,
    })

    const { data: pctVentas } = useQuery({
        queryKey: ["reportes", "pct-ventas", "empleado"],
        queryFn: () => getPorcentajeVentas(user.token),
        enabled: !!user?.token,
    })

    return (
        <main className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Reportes</h1>
                <p className="text-sm text-gray-500">Panel de reportes personales</p>
            </div>

            <BarChartCard title="Ganancias Personales" data={gananciasByPeriodo} />

            <TopProductsCard title="Productos más Vendidos" data={masVendidos} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

export default EmpleadoReportes
