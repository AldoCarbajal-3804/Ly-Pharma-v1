import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { updatePerfil } from "../../services/perfilService";

const buildForm = (user) => ({
    nombres: user?.nombres || "",
    apellidos: user?.apellidos || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
    username: user?.username || "",
});

export const UserForm = ({ user }) => {
    const { updateProfile } = useAuth();
    const [form, setForm] = useState(() => buildForm(user));

    const mutation = useMutation({
        mutationFn: () => updatePerfil(user.token, form),
        onSuccess: () => {
            updateProfile();
        },
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
    };

    const isValid = form.nombres && form.email;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Actualizar Datos</h3>
            <p className="text-sm text-gray-500 mb-5">Modifica la información de tu perfil</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={form.nombres}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Apellidos</label>
                        <input
                            type="text"
                            name="apellidos"
                            value={form.apellidos}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 py-2.5 px-3 outline-none text-gray-800 text-sm focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {mutation.isError && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{mutation.error.message}</p>
                )}

                {mutation.isSuccess && (
                    <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">Perfil actualizado correctamente</p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="reset"
                        onClick={() => setForm(buildForm(user))}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid || mutation.isPending}
                        className="px-5 py-2 text-sm font-semibold text-white bg-green-800 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        {mutation.isPending ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
};