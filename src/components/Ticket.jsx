const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    const d = new Date(dateStr)
    if (isNaN(d)) return dateStr
    return d.toLocaleDateString("es-PE", {
        day: "2-digit", month: "2-digit", year: "numeric",
    })
}

const formatTime = (dateStr) => {
    if (!dateStr) return "-"
    const d = new Date(dateStr)
    if (isNaN(d)) return "-"
    return d.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
}

const getClientName = (sale) => {
    if (typeof sale.cliente === "object" && sale.cliente) {
        return `${sale.cliente.nombres || ""} ${sale.cliente.apellidos || ""}`.trim()
    }
    return sale.cliente || sale.client || "-"
}

const getClientDni = (sale) => {
    if (typeof sale.cliente === "object" && sale.cliente) {
        return sale.cliente.dni || ""
    }
    return ""
}

const getDate = (sale) => sale.fecha ?? sale.date ?? sale.fecha_venta ?? ""

const getTotal = (sale) => {
    const val = sale.total ?? sale.monto_total ?? 0
    return typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.]/g, "")) || 0
}

export function Ticket({ sale, onClose }) {
    const productos = sale.productos ?? sale.detalles ?? sale.items ?? []
    const subtotal = productos.reduce((s, p) => s + ((p.subtotal ?? p.precio_unitario * p.cantidad) || 0), 0)
    const igv = subtotal * 0.18
    const total = getTotal(sale) || subtotal + igv

    const handlePrint = () => {
        window.print()
    }

    const receipt = (
        <div id="ticket-content" className="bg-white p-4 font-mono text-xs leading-relaxed">
            <div className="text-center border-b border-gray-300 pb-3 mb-3">
                <h2 className="text-sm font-bold uppercase">Ly Pharma</h2>
                <p>Boleta de Venta</p>
                <p className="text-gray-500">RUC: 12345678901</p>
            </div>

            <div className="mb-3">
                <p><span className="font-bold">N°:</span> {sale.id_venta ?? sale.id ?? "-"}</p>
                <p><span className="font-bold">Fecha:</span> {formatDate(getDate(sale))}</p>
                <p><span className="font-bold">Hora:</span> {formatTime(getDate(sale))}</p>
                <p><span className="font-bold">Cliente:</span> {getClientName(sale)}</p>
                {getClientDni(sale) && <p><span className="font-bold">DNI:</span> {getClientDni(sale)}</p>}
            </div>

            <table className="w-full mb-3">
                <thead>
                    <tr className="border-t border-b border-gray-300">
                        <th className="text-left py-1 font-bold">Prod.</th>
                        <th className="text-right py-1 font-bold">Cant.</th>
                        <th className="text-right py-1 font-bold">P.Unit</th>
                        <th className="text-right py-1 font-bold">SubT</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-2 text-gray-400">Sin detalle</td>
                        </tr>
                    ) : productos.map((p, i) => (
                        <tr key={i}>
                            <td className="py-0.5 truncate max-w-28">{p.nombre ?? p.producto ?? "-"}</td>
                            <td className="text-right py-0.5">{p.cantidad ?? 0}</td>
                            <td className="text-right py-0.5">S/{(p.precio_unitario ?? 0).toFixed(2)}</td>
                            <td className="text-right py-0.5">S/{((p.subtotal ?? p.precio_unitario * p.cantidad) || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="border-t border-gray-300 pt-2 space-y-1">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>S/{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>IGV (18%):</span>
                    <span>S/{igv.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm border-t border-gray-300 pt-1">
                    <span>TOTAL:</span>
                    <span>S/{total.toFixed(2)}</span>
                </div>
            </div>

            <div className="text-center mt-4 pt-3 border-t border-gray-300 text-gray-500">
                <p>¡Gracias por su compra!</p>
            </div>
        </div>
    )

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl shadow-xl mx-4 overflow-hidden print-hidden" style={{ width: "380px" }}>
                    {receipt}

                    <div className="flex gap-2 p-4 pt-0 print-hidden">
                        <button
                            onClick={handlePrint}
                            className="flex-1 py-2.5 bg-green-800 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors cursor-pointer"
                        >
                            Imprimir
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    body > *:not(#ticket-content) {
                        display: none !important;
                    }
                    #ticket-content {
                        display: block !important;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 80mm;
                        padding: 4mm;
                        margin: 0;
                        background: white;
                        font-size: 10pt;
                        font-family: monospace;
                    }
                    .print-hidden { display: none !important; }
                    @page { margin: 0; size: 80mm auto; }
                }
            `}</style>
        </>
    )
}
