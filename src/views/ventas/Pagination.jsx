export const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
                Anterior
            </button>

            <div className="flex items-center gap-1.5">
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
            </div>

            <div className="flex items-center gap-3">
                <p className="text-sm text-gray-500">
                    {startItem}-{endItem} de {totalItems}
                </p>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
