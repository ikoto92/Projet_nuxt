import * as XLSX from 'xlsx'

export function useExport<T = any>() {
  function exportToCSV(data: T[], headers: string[], filename: string) {
    const csv = [headers.join(',')]
    data.forEach(row => {
      csv.push(headers.map(h => row[h as keyof T]).join(','))
    })

    const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportToXLSX(data: T[], headers: string[], filename: string) {
    const rows = [headers, ...data.map(row => headers.map(h => row[h as keyof T]))]
    const worksheet = XLSX.utils.aoa_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille 1')
    XLSX.writeFile(workbook, `${filename}.xlsx`)
  }

  return {
    exportToCSV,
    exportToXLSX
  }
}
