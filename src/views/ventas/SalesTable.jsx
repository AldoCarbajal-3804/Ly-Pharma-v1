export const SalesTable = ({ sales }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">ID Venta</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Fecha</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Hora</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2">
                                <span className="font-semibold text-green-800">{sale.id}</span>
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-600">{formatDate(sale.date)}</td>
                            <td className="py-3 px-2 text-sm text-gray-600">{sale.hour}</td>
                            <td className="py-3 px-2">
                                <p className="font-medium text-gray-800">{sale.client}</p>
                            </td>
                            <td className="py-3 px-2">
                                <span className="font-bold text-gray-800">{sale.total}</span>
                            </td>
                            <td className="py-3 px-2">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer" title="Ver">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors cursor-pointer" title="Eliminar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                            <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
