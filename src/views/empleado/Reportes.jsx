import { useAuth } from "../../hooks/useAuth"

function EmpleadoReportes() {
    const { user } = useAuth()

    return (
        <main className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Reportes</h1>
                <p className="text-sm text-gray-500">Panel de reportes personales</p>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Ganancia del Día</h3>
                    <p className="text-2xl font-bold text-gray-800">S/ --</p>
                </article>
                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Ganancia de la Semana</h3>
                    <p className="text-2xl font-bold text-gray-800">S/ --</p>
                </article>
                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Ganancia del Mes</h3>
                    <p className="text-2xl font-bold text-gray-800">S/ --</p>
                </article>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">Productos más Vendidos</h3>
                    <p className="text-sm text-gray-400">Próximamente...</p>
                </article>

                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">% Categoría, Tipo y Proveedor</h3>
                    <p className="text-sm text-gray-400">Próximamente...</p>
                </article>
            </div>
        </main>
    )
}

export default EmpleadoReportes
