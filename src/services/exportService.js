import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export function exportToExcel(data, columns, filename = "export") {
    const header = columns.map((c) => c.label)
    const rows = data.map((row) => columns.map((c) => c.getValue ? c.getValue(row) : row[c.value]))

    const ws = XLSX.utils.aoa_to_sheet([header, ...rows])

    const colWidths = columns.map((c) => ({ wch: c.width ?? 20 }))
    ws["!cols"] = colWidths

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([buf], { type: "application/octet-stream" })
    saveAs(blob, `${filename}.xlsx`)
}
