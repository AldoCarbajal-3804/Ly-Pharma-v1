import { useState, useMemo } from "react";

const CATEGORIES = [
  "Todos",
  "Medicamentos",
  "Antibióticos",
  "Vitaminas y Suplementos",
  "Cuidado Personal",
  "Veterinaria",
];

const PRODUCTS = [
  { id: 1, name: "Paracetamol 500mg", category: "Medicamentos", price: 8.50, stock: 120, minStock: 20, expiry: "2025-12-15" },
  { id: 2, name: "Ibuprofeno 400mg", category: "Medicamentos", price: 12.00, stock: 85, minStock: 15, expiry: "2026-03-20" },
  { id: 3, name: "Amoxicilina 500mg", category: "Antibióticos", price: 25.00, stock: 3, minStock: 10, expiry: "2025-08-10" },
  { id: 4, name: "Vitamina C 1000mg", category: "Vitaminas y Suplementos", price: 35.00, stock: 45, minStock: 10, expiry: "2026-06-30" },
  { id: 5, name: "Alcohol en Gel 70°", category: "Cuidado Personal", price: 15.00, stock: 0, minStock: 15, expiry: "2027-01-01" },
  { id: 6, name: "Complejo B 50mg", category: "Vitaminas y Suplementos", price: 28.00, stock: 60, minStock: 10, expiry: "2025-11-20" },
  { id: 7, name: "Dexametasona 4mg", category: "Medicamentos", price: 18.00, stock: 7, minStock: 15, expiry: "2025-09-05" },
  { id: 8, name: "Amoxicilina 250mg/5ml", category: "Antibióticos", price: 22.00, stock: 25, minStock: 8, expiry: "2026-02-14" },
  { id: 9, name: "Mascarilla Quirúrgica x50", category: "Cuidado Personal", price: 25.00, stock: 500, minStock: 100, expiry: "2027-06-01" },
  { id: 10, name: "Desparasitante Canino", category: "Veterinaria", price: 45.00, stock: 15, minStock: 5, expiry: "2026-08-15" },
  { id: 11, name: "Loratadina 10mg", category: "Medicamentos", price: 14.00, stock: 12, minStock: 10, expiry: "2026-04-22" },
  { id: 12, name: "Suero Oral Pediátrico", category: "Medicamentos", price: 6.00, stock: 40, minStock: 20, expiry: "2025-10-30" },
  { id: 13, name: "Multivitamínico Infantil", category: "Vitaminas y Suplementos", price: 48.00, stock: 22, minStock: 8, expiry: "2026-07-15" },
  { id: 14, name: "Venda Elástica 4\"", category: "Cuidado Personal", price: 7.50, stock: 35, minStock: 20, expiry: "2027-12-01" },
  { id: 15, name: "Antipulgas Felino", category: "Veterinaria", price: 55.00, stock: 8, minStock: 5, expiry: "2026-05-10" },
];

function getStatus(stock, minStock) {
  if (stock === 0) return { label: "Agotado", key: "agotado" };
  if (stock <= minStock * 0.5) return { label: "Crítico", key: "critico" };
  if (stock <= minStock) return { label: "Bajo Stock", key: "bajo" };
  return { label: "Disponible", key: "disponible" };
}

const STATUS = {
  disponible: { dot: "bg-green-500", badge: "bg-green-50 text-green-700", border: "border-l-green-500", bar: "bg-green-400" },
  bajo: { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700", border: "border-l-amber-500", bar: "bg-amber-400" },
  critico: { dot: "bg-red-500", badge: "bg-red-50 text-red-700", border: "border-l-red-500", bar: "bg-red-400" },
  agotado: { dot: "bg-gray-300", badge: "bg-gray-50 text-gray-500", border: "border-l-gray-300", bar: "bg-gray-200" },
};

function ProductCard({ product, index }) {
  const { label, key } = getStatus(product.stock, product.minStock);
  const s = STATUS[key];

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 border-l-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group ${s.border}`}
      style={{ animation: `cardIn 0.45s ease-out ${index * 0.05}s both` }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${s.dot} ${key === "critico" ? "animate-pulse" : ""}`} />
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>{label}</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">#{String(product.id).padStart(3, "0")}</span>
        </div>

        <h3 className="text-[17px] font-heading font-semibold text-gray-800 mb-1 leading-tight">{product.name}</h3>

        <span className="inline-block text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-3">
          {product.category}
        </span>

        <div className="mt-4">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">S/ {product.price.toFixed(2)}</span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Stock:</span>
            <span className={`font-semibold ${key === "agotado" || key === "critico" ? "text-red-600" : "text-gray-700"}`}>
              {product.stock} unid.
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${s.bar}`}
              style={{ width: `${Math.min((product.stock / (product.minStock * 3)) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Stock mín: {product.minStock}</span>
            <span>Vence: {new Date(product.expiry).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "2-digit" })}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
          <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
            Editar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PRODUCTS.filter(p =>
      (category === "Todos" || p.category === category) &&
      (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
  }, [search, category]);

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gray-800">Productos</h1>
              <p className="text-sm text-gray-500 font-body">{filtered.length} de {PRODUCTS.length} productos registrados</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-gray-300 font-body"
            />
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 cursor-pointer font-body">
            + Nuevo Producto
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer font-body ${
              category === cat
                ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/25"
                : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 11.625l2.25-2.25M12 11.625l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-500 mb-1">Ningún producto encontrado</h3>
          <p className="text-gray-400 text-sm font-body">Intenta ajustar tu búsqueda o filtro</p>
        </div>
      )}
    </div>
  );
}
