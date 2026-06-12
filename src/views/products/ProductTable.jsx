import edit from "../../assets/icons/productos/edit.svg"
import trash from "../../assets/icons/productos/trash.svg"

export const ProductTable = ({ products, onEdit, onDelete }) => {
    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    const getDaysUntilExpire = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expire = new Date(dateStr);
        expire.setHours(0, 0, 0, 0);
        return Math.ceil((expire - today) / (1000 * 60 * 60 * 24));
    };

    const getRowStyle = (product) => {
        const days = getDaysUntilExpire(product["date-expire"]);
        if (days <= 40) return "bg-red-50 border-b border-red-100";
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
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Categoría</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Vencimiento</th>
                        <th className="text-center py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Proveedores</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className={`${getRowStyle(product)} hover:bg-opacity-70 transition-colors`}>
                            <td className="py-3 px-2 font-medium text-gray-800 text-center">{product.name}</td>
                            <td className="py-3 px-2 text-gray-600 text-center">{capitalize(product.category)}</td>
                            <td className="py-3 px-2 text-gray-600 text-center">{capitalize(product.type)}</td>
                            <td className="py-3 px-2 text-center">
                                <span className={`font-semibold ${getStockColor(product.stock)}`}>
                                    {product.stock}
                                </span>
                            </td>
                            <td className="py-3 px-2 text-gray-600 text-center">{product.provider}</td>
                            <td className="py-3 px-2 text-gray-600 text-xs text-center">{product["date-expire"]?.split('T')[0]}</td>
                            <td className="py-3 px-2">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer" title="Editar" onClick={() => onEdit(product)}>
                                        <img src={edit} alt="Editar" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors cursor-pointer" title="Eliminar" onClick={() => onDelete(product)}>
                                        <img src={trash} alt="Eliminar" />
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
