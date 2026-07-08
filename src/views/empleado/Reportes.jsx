import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { getProductosMasVendidos, getPorcentajeVentas } from "../../services/reportService"
import { GananciasCard } from "../../components/charts/GananciasCard"
import { PieChartCard } from "../../components/charts/PieChartCard"
import { TopProductsCard } from "../../components/charts/TopProductsCard"

function EmpleadoReportes() {
    const { user } = useAuth()
    const idEmpleado = user?.id_empleado

    const { data: masVendidos = [] } = useQuery({
        queryKey: ["reportes", "mas-vendidos", idEmpleado],
        queryFn: () => getProductosMasVendidos(user.token, 10, idEmpleado),
        enabled: !!user?.token,
    })

    const { data: pctVentas } = useQuery({
        queryKey: ["reportes", "pct-ventas", "empleado", idEmpleado],
        queryFn: () => getPorcentajeVentas(user.token, idEmpleado),
        enabled: !!user?.token,
    })

    return (
        <main className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Reportes</h1>
                <p className="text-sm text-gray-500">Panel de reportes personales</p>
            </div>

            <GananciasCard title="Ganancias Personales" showAnio={false} idEmpleado={idEmpleado} />

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
