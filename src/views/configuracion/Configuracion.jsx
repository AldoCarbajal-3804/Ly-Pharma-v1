import { useAuth } from "../../hooks/useAuth";
import { ProfileCard } from "./ProfileCard";
import { UserForm } from "./UserForm";

function Configuracion() {
    const { user } = useAuth();

    return (
        <main className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Configuración</h1>
                    <p className="text-sm text-gray-500">Administra tu perfil y datos personales</p>
                </div>
            </div>

            <ProfileCard usuario={user} />

            <UserForm user={user} />
        </main>
    );
}

export default Configuracion;
