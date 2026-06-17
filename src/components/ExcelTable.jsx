import { exportToExcel } from "../services/exportService"

export function ExcelTable({ data, columns, filename = "export", children }) {
    const handleExport = () => {
        if (!data || data.length === 0) return
        exportToExcel(data, columns, filename)
    }

    return (
        <button
            onClick={handleExport}
            className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
        >
            {children || "Exportar"}
        </button>
    )
}
