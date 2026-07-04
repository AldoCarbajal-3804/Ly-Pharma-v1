import { useState } from "react"
import { AddSale } from "../ventas/AddSale"

function EmpleadoSales() {
    const [showAddModal, setShowAddModal] = useState(false)

    return (
        <main className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            {showAddModal && <AddSale onClose={() => setShowAddModal(false)} />}

            <section className="bg-white rounded-xl border border-gray-100">
                <header className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Nueva Venta</h2>
                        <p className="text-sm text-gray-500">Registra una nueva venta para el cliente</p>
                    </div>

                    <nav aria-label="Acciones de ventas">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="rounded-xl bg-green-800 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors cursor-pointer"
                        >
                            Nueva Venta
                        </button>
                    </nav>
                </header>

                <div className="p-5 pt-0">
                    <p className="text-sm text-gray-400 text-center py-8">
                        Haz clic en "Nueva Venta" para registrar una venta
                    </p>
                </div>
            </section>
        </main>
    )
}

export default EmpleadoSales
