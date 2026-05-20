import { useState } from "react";
import products from "../../data/products.json"
import { SearchProducts } from "./SearchProducts";
import { FilterProducts } from "./FilterProducts";
import { ProductTable } from "./ProductTable";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 6;

function Products() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <main className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            <SearchProducts />
            <FilterProducts />

            <ProductTable products={currentProducts} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>
    );

}

export default Products;