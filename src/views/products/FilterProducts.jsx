export const FilterProducts = () => {
    return (
        <section className="mb-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Filtros</h3>

            <main className="flex gap-4 items-end">
                <div className="flex-3 flex gap-4">
                    <group className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">Categoría</label>
                        <select className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm">
                            <option value="">Todas las categorías</option>
                            <option value="Antibiótico">Antibiótico</option>
                            <option value="Analgésico">Analgésico</option>
                            <option value="Antihistamínico">Antihistamínico</option>
                            <option value="Gastrointestinal">Gastrointestinal</option>
                            <option value="Antidiabético">Antidiabético</option>
                            <option value="Cardiovascular">Cardiovascular</option>
                            <option value="Respiratorio">Respiratorio</option>
                            <option value="Neurológico">Neurológico</option>
                            <option value="Dermatológico">Dermatológico</option>
                            <option value="Suplemento">Suplemento</option>
                        </select>
                    </group>

                    <group className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">Tipo</label>
                        <select className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm">
                            <option value="">Todos los tipos</option>
                            <option value="Tabletas">Tabletas</option>
                            <option value="Capsulas">Capsulas</option>
                            <option value="Cápsulas">Cápsulas</option>
                            <option value="Inhalador">Inhalador</option>
                            <option value="Crema">Crema</option>
                        </select>
                    </group>

                    <group className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">Proveedor</label>
                        <select className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm">
                            <option value="">Todos los proveedores</option>
                            <option value="PharmaCorp Int.">PharmaCorp Int.</option>
                            <option value="MedSupply Co.">MedSupply Co.</option>
                            <option value="BioLab Solutions">BioLab Solutions</option>
                            <option value="GlobalHealth Ltd.">GlobalHealth Ltd.</option>
                        </select>
                    </group>
                </div>

                <div className="h-px bg-transparent w-8 self-stretch" />

                <div className="flex-[1.5] flex gap-4">
                    <group className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">Costo</label>
                        <select className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm">
                            <option value="">Sin orden</option>
                            <option value="desc">Mayor costo</option>
                            <option value="asc">Menor costo</option>
                        </select>
                    </group>

                    <group className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">Vencimiento</label>
                        <select className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm">
                            <option value="">Sin orden</option>
                            <option value="asc">Más recientes</option>
                            <option value="desc">Más lejanos</option>
                        </select>
                    </group>
                </div>

                <div className="h-px bg-transparent w-8 self-stretch" />

                <div className="flex-1 flex items-end">
                    <button className="w-full px-4 py-2.5 text-sm font-medium text-white bg-green-800 rounded-xl hover:bg-green-700 transition-colors cursor-pointer">
                        Limpiar filtros
                    </button>
                </div>
            </main>

            
        </section>
    );
};