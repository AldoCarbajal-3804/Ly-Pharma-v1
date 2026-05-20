export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <footer className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
                Anterior
            </button>

            <main className="flex items-center gap-1.5">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                            page === currentPage
                                ? "bg-green-800 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </main>

            <section className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-xl hover:bg-green-700 transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Agregar producto
                </button>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    Siguiente
                </button>
            </section>
        </footer>
    );
};
