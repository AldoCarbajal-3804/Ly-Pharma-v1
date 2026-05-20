const sales = [
  {
    id: "#VEN-00842",
    client: "Alejandro Morales",
    seller: "Elena Rivas",
    total: "$1,420.00",
    date: "24 Oct, 2023",
    hour: "14:32",
  },

  {
    id: "#VEN-00840",
    client: "Roberto Pineda",
    seller: "Elena Rivas",
    total: "$3,100.00",
    date: "24 Oct, 2023",
    hour: "11:45",
  },

  {
    id: "#VEN-00839",
    client: "Camila Torres",
    seller: "Luis Herrera",
    total: "$890.00",
    date: "23 Oct, 2023",
    hour: "17:20",
  },

  {
    id: "#VEN-00838",
    client: "Daniel Gómez",
    seller: "María López",
    total: "$560.00",
    date: "23 Oct, 2023",
    hour: "15:05",
  },
];

export default function SalesHistory() {
  return (
    <main className="space-y-6">

      {/* STATS */}
      <section
        aria-label="Resumen de ventas"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >

        {/* CARD 1 */}
        <article className="rounded-2xl border border-[#d7d5cb] bg-[#f7f6f1] p-5">
          <header className="mb-5 flex items-center justify-between">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-200 text-xl">
              💰
            </div>

            <span className="text-sm text-lime-700">
              ↗
            </span>

          </header>

          <div>
            <p className="text-sm font-medium text-gray-600">
              Ingresos por Productos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[#0d1b2a]">
              $12,450.00
            </h2>
          </div>

          <footer className="mt-6 border-t border-[#d7d5cb] pt-4">
            <p className="text-sm font-semibold text-lime-700">
              +12.5% vs ayer
            </p>
          </footer>
        </article>

        {/* CARD 2 */}
        <article className="rounded-2xl border border-[#d7d5cb] bg-[#f7f6f1] p-5">
          <header className="mb-5 flex items-center justify-between">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-200 text-xl">
              🛒
            </div>

            <span className="text-sm text-lime-700">
              ↗
            </span>

          </header>

          <div>
            <p className="text-sm font-medium text-gray-600">
              Volumen de Ventas
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[#0d1b2a]">
              156 Unidades
            </h2>
          </div>

          <footer className="mt-6 border-t border-[#d7d5cb] pt-4">
            <p className="text-sm font-semibold text-lime-700">
              +8.2% vs ayer
            </p>
          </footer>
        </article>

      </section>

      {/* SALES TABLE */}
      <section className="rounded-2xl border border-[#d7d5cb] bg-[#f7f6f1]">

        {/* HEADER */}
        <header className="flex flex-col gap-4 border-b border-[#d7d5cb] p-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-lg font-bold text-[#0d1b2a]">
              Historial de Productos Vendidos
            </h2>

            <p className="text-sm text-gray-500">
              Registro reciente de ventas realizadas
            </p>
          </div>

          {/* ACTIONS */}
          <nav
            aria-label="Acciones de ventas"
            className="flex flex-wrap gap-3"
          >

            <button className="rounded-xl border border-[#d7d5cb] bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Filtros
            </button>

            <button className="rounded-xl border border-[#d7d5cb] bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Exportar
            </button>

            <button className="rounded-xl bg-lime-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-lime-700">
              + Nueva Venta
            </button>

          </nav>
        </header>

        {/* TABLE */}
        <section
          aria-label="Tabla de ventas"
          className="overflow-x-auto"
        >

          <table className="w-full border-collapse">

            <thead className="bg-[#efeee9]">
              <tr className="border-b border-[#d7d5cb]">

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  ID Venta
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Fecha
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Hora
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Cliente
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Vendedor
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Total
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Acciones
                </th>

              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b border-[#d7d5cb] bg-white hover:bg-[#faf9f5]"
                >

                  <td className="px-5 py-5">
                    <span className="font-semibold text-lime-800">
                      {sale.id}
                    </span>
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-700">
                    {sale.date}
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-700">
                    {sale.hour}
                  </td>

                  <td className="px-5 py-5">
                    <p className="font-semibold text-[#0d1b2a]">
                      {sale.client}
                    </p>
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-700">
                    {sale.seller}
                  </td>

                  <td className="px-5 py-5">
                    <span className="font-bold text-[#0d1b2a]">
                      {sale.total}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100">
                      Ver
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </section>

        {/* PAGINATION */}
        <footer className="flex flex-col gap-4 border-t border-[#d7d5cb] p-5 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-gray-600">
            Mostrando 1 - 4 de 24 ventas
          </p>

          <nav
            aria-label="Paginación"
            className="flex items-center gap-2"
          >

            <button className="rounded-lg border border-[#d7d5cb] bg-white px-3 py-2 text-sm hover:bg-gray-100">
              ←
            </button>

            <button className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-semibold text-white">
              1
            </button>

            <button className="rounded-lg border border-[#d7d5cb] bg-white px-4 py-2 text-sm hover:bg-gray-100">
              2
            </button>

            <button className="rounded-lg border border-[#d7d5cb] bg-white px-4 py-2 text-sm hover:bg-gray-100">
              3
            </button>

            <button className="rounded-lg border border-[#d7d5cb] bg-white px-3 py-2 text-sm hover:bg-gray-100">
              →
            </button>

          </nav>
        </footer>

      </section>
    </main>
  );
}