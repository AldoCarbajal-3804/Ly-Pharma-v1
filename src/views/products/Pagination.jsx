export const Pagination = ({ currentPage, totalPages, total, itemsPerPage, onPageChange }) => {
    const from = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const to = Math.min(currentPage * itemsPerPage, total);

    const getPages = () => {
        const pages = [];
        const delta = 2;
        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);

        pages.push(1);
        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push("...");
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    return (
        <footer className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
                Mostrando <span className="font-medium text-gray-700">{from}-{to}</span> de{" "}
                <span className="font-medium text-gray-700">{total}</span> productos
            </p>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    Anterior
                </button>

                {totalPages > 0 && getPages().map((page, i) =>
                    page === "..." ? (
                        <span key={`ellipsis-${i}`} className="px-1 text-sm text-gray-400">...</span>
                    ) : (
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
                    )
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    Siguiente
                </button>
            </div>
        </footer>
    );
};
