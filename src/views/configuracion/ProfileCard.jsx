export const ProfileCard = ({ usuario }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-green-800 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {usuario.avatar}
                </div>

                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-800">
                        {usuario.nombre} {usuario.apellidos}
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="inline-flex items-center gap-1 text-sm text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium">
                            {usuario.rol}
                        </span>
                        <span className="text-sm text-gray-500">{usuario.email}</span>
                    </div>

                    <p className="text-sm text-gray-400 mt-1">
                        Miembro desde {usuario.miembroDesde}
                    </p>
                </div>

                <button className="px-4 py-2 text-sm font-medium text-green-800 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer shrink-0">
                    Cambiar foto
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
                <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Teléfono</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{usuario.telefono}</p>
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Dirección</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">{usuario.direccion}</p>
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Usuario</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">@{usuario.usuario}</p>
                </div>
            </div>
        </div>
    );
};
