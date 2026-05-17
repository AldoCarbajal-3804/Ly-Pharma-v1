import { StatCard } from "../components/StatCard.jsx"

function Inicio(){
    return(
        <>
            <div className="flex flex-wrap gap-6 mb-10">
                <StatCard 
                    title="Ventas del Día" 
                    value="$4,280.50" 
                    badge="↗ 12.5%" 
                    badgeType="success" 
                    icon="text-green-600" 
                />
                <StatCard 
                    title="Productos con Bajo Stock" 
                    value="14 Items" 
                    badge="Revisar" 
                    badgeType="warning" 
                    icon="text-orange-500" 
                />
                <StatCard 
                    title="Productos a Expirar" 
                    value="5 Batches" 
                    badge="Critico" 
                    badgeType="danger" 
                    icon="text-red-600" 
                />
                <StatCard 
                    title="Ganancia Diaria" 
                    value="$1,124.20" 
                    badge="Ganancia Neta" 
                    badgeType="info" 
                    icon="text-emerald-600" 
                />
            </div>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-lg">Recent Transactions</h3>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[11px] uppercase font-bold text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Fecha de Transacción</th>
                            <th className="px-6 py-4">Nombres</th>
                            <th className="px-6 py-4">Apellidos</th>
                            <th className="px-6 py-4">Monto</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[
                            { date: "23 Oct 2023, 11:45 AM", name: "Maria", lastname: "Fernandez", amount: "$45.90" },
                            { date: "23 Oct 2023, 10:30 AM", name: "Roberto", lastname: "Gomez", amount: "$120.00"},
                            { date: "23 Oct 2023, 09:15 AM", name: "Elena", lastname: "Vasquez", amount: "$18.50"},
                            { date: "23 Oct 2023, 08:45 AM", name: "John", lastname: "Smith", amount: "$342.10"},
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">{row.date}</td>
                                <td className="px-6 py-4 text-sm  text-gray-800">{row.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    {row.lastname}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{row.amount}</td>
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Inicio