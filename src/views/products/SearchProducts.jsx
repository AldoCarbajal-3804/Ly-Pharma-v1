import search from "../../assets/icons/search.svg";
import deleteIcon from "../../assets/icons/delete.svg";


export const SearchProducts = () => {

    return(
        <header className="mb-5 " >
            <form className="mb-5">
                <label
                    htmlFor="search"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Buscar producto
                </label>

                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <img src={search} alt="search" className="w-5 h-5 cursor-pointer" />
                    </span>

                    <input
                        id="search"
                        type="text"
                        placeholder="Ingrese el nombre del producto para buscarlo ... "
                        className="w-full rounded-xl bg-gray-100 py-3 pl-10 outline-none text-gray-800"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <img src={deleteIcon} alt="delete" className="w-5 h-5 cursor-pointer" />
                    </span>
                </div>
            </form>
        </header>
    )

}