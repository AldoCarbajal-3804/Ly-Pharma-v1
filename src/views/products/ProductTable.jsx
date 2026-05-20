export const ProductTable = ({ products }) => {
    const getDaysUntilExpire = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expire = new Date(dateStr);
        expire.setHours(0, 0, 0, 0);
        return Math.ceil((expire - today) / (1000 * 60 * 60 * 24));
    };

    const getRowStyle = (product) => {
        const days = getDaysUntilExpire(product["date-expire"]);
        if (days <= 5) return "bg-red-50 border-b border-red-100";
        if (days <= 10) return "bg-orange-50 border-b border-orange-100";
        return "border-b border-gray-50";
    };

    const getStockColor = (stock) => {
        if (stock === 0) return "text-red-600";
        if (stock < 20) return "text-orange-500";
        return "text-gray-800";
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Categoría</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Precio</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Proveedor</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Vence</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className={`${getRowStyle(product)} hover:bg-opacity-70 transition-colors`}>
                            <td className="py-3 px-2 font-medium text-gray-800">{product.name}</td>
                            <td className="py-3 px-2 text-gray-600">{product.category}</td>
                            <td className="py-3 px-2 text-gray-600">{product.type}</td>
                            <td className="py-3 px-2">
                                <span className={`font-semibold ${getStockColor(product.stock)}`}>
                                    {product.stock}
                                </span>
                            </td>
                            <td className="py-3 px-2 text-gray-800 font-semibold">{product.price}</td>
                            <td className="py-3 px-2 text-gray-600">{product.provider}</td>
                            <td className="py-3 px-2 text-gray-600 text-xs">{product["date-expire"]}</td>
                            <td className="py-3 px-2">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer" title="Editar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
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
