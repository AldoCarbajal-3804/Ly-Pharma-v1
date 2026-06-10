import { StatCard } from "./StatCard.jsx"
import {AlertsProducts} from "./AlertProducts.jsx"
import transactions from "../../data/transaction.json"
import alerts from "../../data/alerts-products.json"
import sales from "../../assets/icons/inicio/sales.svg"
import low_stock from "../../assets/icons/inicio/low_stock.svg"
import defeat_product from "../../assets/icons/inicio/defeat_product.svg"
import ganances from "../../assets/icons/inicio/ganances.svg"

function Inicio(){
    return(
        <>
            <div className="flex flex-wrap gap-6 mb-10">
                <StatCard 
                    title="Ventas del Día"
                    value="$4,280.50"
                    badge="↗ 12.5%"
                    badgeType="success"
                    iconSvg={sales}
                />
                <StatCard 
                    title="Productos con Bajo Stock"
                    value="14 items"
                    badge="Revisar"
                    badgeType="warning"
                    iconSvg={low_stock}
                />
                <StatCard 
                    title="Productos a Expirar"
                    value="5 items"
                    badge="Crítico"
                    badgeType="danger"
                    iconSvg={defeat_product}
                />
                <StatCard 
                    title="Ganancia Diaria"
                    value="$1,124.20"
                    badge="Ganancia Neta"
                    badgeType="info"
                    iconSvg={ganances}
                />
            </div>

            <article className="flex gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-2/3">
                    <header className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg">Transacciones Recientes</h3>
                    </header>

                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400">
                            <tr>
                                <th className="px-6 py-4">Fecha de Transacción</th>
                                <th className="px-6 py-4">Nombres</th>
                                <th className="px-6 py-4">Apellidos</th>
                                <th className="px-6 py-4">Monto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.map((row, i) => (
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
                </div>
                <div className="flex-1/3 bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                    <header className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg">Alertas de Productos</h3>
                    </header>
                    <div className="p-6 flex flex-col gap-4">
                        {alerts.map((alert, i) => (
                            <AlertsProducts
                                key={i}
                                name={alert.name}
                                stock={alert.stock}
                                badge={alert.badge}
                                badgeColor={alert.badgeColor}
                            />      
                        ))}
                    </div>
                </div>
            </article>
        </>
    )
}

export default Inicio