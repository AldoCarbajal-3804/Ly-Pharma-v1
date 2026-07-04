import { useAuth } from "../../hooks/useAuth"

function AdminReportes() {
    const { user } = useAuth()

    return (
        <main className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Reportes</h1>
                <p className="text-sm text-gray-500">Panel de reportes administrativos</p>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Ganancia del Año</h3>
                    <p className="text-2xl font-bold text-gray-800">S/ --</p>
                </article>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">Ranking de Empleados</h3>
                    <p className="text-sm text-gray-400">Próximamente...</p>
                </article>

                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">Horarios de Empleados</h3>
                    <p className="text-sm text-gray-400">Próximamente...</p>
                </article>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">% Productos por Proveedor, Categoría y Tipo</h3>
                    <p className="text-sm text-gray-400">Próximamente...</p>
                </article>

                <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">% Ventas por Proveedor, Categoría y Tipo</h3>
                    <p className="text-sm text-gray-400">Próximamente...</p>
                </article>
            </div>
        </main>
    )
}

export default AdminReportes
