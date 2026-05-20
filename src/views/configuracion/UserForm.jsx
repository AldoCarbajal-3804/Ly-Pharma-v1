export const UserForm = ({ usuario }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Actualizar Datos</h3>
            <p className="text-sm text-gray-500 mb-5">Modifica la información de tu perfil</p>

            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Nombres</label>
                        <input
                            type="text"
                            defaultValue={usuario.nombre}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Apellidos</label>
                        <input
                            type="text"
                            defaultValue={usuario.apellidos}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Correo electrónico</label>
                        <input
                            type="email"
                            defaultValue={usuario.email}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Teléfono</label>
                        <input
                            type="tel"
                            defaultValue={usuario.telefono}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">Dirección</label>
                        <input
                            type="text"
                            defaultValue={usuario.direccion}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Rol</label>
                        <input
                            type="text"
                            defaultValue={usuario.rol}
                            disabled
                            className="w-full rounded-xl bg-gray-50 py-2.5 px-3 outline-none text-gray-500 text-sm cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Usuario</label>
                        <input
                            type="text"
                            defaultValue={usuario.usuario}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Contraseña</label>
                        <input
                            type="password"
                            defaultValue={usuario.contrasena}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Confirmar contraseña</label>
                        <input
                            type="password"
                            placeholder="Repite la contraseña"
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="reset"
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 text-sm font-semibold text-white bg-green-800 rounded-xl hover:bg-green-700 transition-colors cursor-pointer"
                    >
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    );
};
