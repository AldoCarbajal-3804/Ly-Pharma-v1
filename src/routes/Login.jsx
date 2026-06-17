import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { unforgetPassword, restablecePassowrd } from "../services/perfilService";
import banner from '../assets/banner.webp';


function Submit({ pending, label = "INICIAR SESIÓN" }) {
    return (
        <button
            type="submit"
            className={`p-2 text-white font-bold cursor-pointer flex items-center justify-center gap-2 ${pending ? 'bg-gray-500' : 'bg-green-700'}`}
            disabled={pending}
        >
            {pending ? (
                <>
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    CARGANDO...
                </>
            ) : label}
        </button>
    );
}


function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [view, setView] = useState("login");
    const [resetUser, setResetUser] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setPending(true);

        try {
            await login(username, password);
            navigate('/principal');
        } catch (err) {
            setError(err.message);
        }

        setPending(false);
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setPending(true);

        try {
            const data = await unforgetPassword({ username: resetUser });
            setResetToken(data.token);
            setView("reset");
        } catch (err) {
            setError(err.message);
        }

        setPending(false);
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setPending(true);

        try {
            const data = await restablecePassowrd({ token: resetToken, new_password: newPassword });
            setSuccessMsg(data.message);
            setView("success");
        } catch (err) {
            setError(err.message);
        }

        setPending(false);
    };

    const handleBackToLogin = () => {
        setView("login");
        setResetUser("");
        setResetToken("");
        setNewPassword("");
        setSuccessMsg("");
        setError("");
    };

    return (

        <main id="login" className='flex justify-center items-center min-h-screen'>
            <div className='flex'>
                <figure className='flex items-center'>
                    <img src={banner} alt="Banner de Ly Pharma" className='w-70' />
                </figure>

                <aside className='bg-emerald-100 px-14 flex flex-col'>
                    {view === "login" && (
                        <>
                            <header className='my-11'>
                                <h1 className='text-2xl font-bold mb-4'>INICIAR SESIÓN</h1>
                                <p className='text-lg'>Inicie sesión para ingresar al programa</p>
                            </header>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

                                <fieldset>
                                    <label htmlFor="username" className='font-semibold text-lg mb-2 block'>Usuario:</label>
                                    <input
                                        placeholder="Ingrese su usuario"
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='bg-white border text-base border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:none'
                                    />
                                </fieldset>
                                <span className='py-0.5'></span>
                                <fieldset>
                                    <label htmlFor="password" className='font-semibold text-lg mb-2 block'>Contraseña:</label>
                                    <input
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='bg-white border text-base border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:none'
                                    />
                                </fieldset>
                                <span className='py-0.5'></span>
                                {error && (
                                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
                                )}
                                <div className='flex justify-between items-center'>
                                    <fieldset>
                                        <label htmlFor="remember" className='text-sm'>
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                name="remember"
                                            />
                                            Recordarme
                                        </label>
                                    </fieldset>
                                    <span
                                        onClick={() => { setError(""); setView("forgot"); }}
                                        className='text-blue-500 hover:underline cursor-pointer text-sm'
                                    >
                                        Olvidaste tu contraseña?
                                    </span>
                                </div>
                                <span className='py-0.5'></span>
                                <Submit pending={pending} />
                            </form>
                        </>
                    )}

                    {view === "forgot" && (
                        <>
                            <header className='my-11'>
                                <h1 className='text-2xl font-bold mb-4'>RESTABLECER CONTRASEÑA</h1>
                                <p className='text-lg'>Ingrese su usuario para recibir el token</p>
                            </header>
                            <form onSubmit={handleForgotSubmit} className='flex flex-col gap-6'>
                                <fieldset>
                                    <label htmlFor="resetUser" className='font-semibold text-lg mb-2 block'>Usuario:</label>
                                    <input
                                        placeholder="Ingrese su usuario"
                                        type="text"
                                        id="resetUser"
                                        name="resetUser"
                                        value={resetUser}
                                        onChange={(e) => setResetUser(e.target.value)}
                                        className='bg-white border text-base border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:none'
                                    />
                                </fieldset>
                                <span className='py-0.5'></span>
                                {error && (
                                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
                                )}
                                <Submit pending={pending} label="ENVIAR" />
                                <span
                                    onClick={handleBackToLogin}
                                    className='text-blue-500 hover:underline cursor-pointer text-sm text-center'
                                >
                                    Volver al inicio de sesión
                                </span>
                            </form>
                        </>
                    )}

                    {view === "reset" && (
                        <>
                            <header className='my-11'>
                                <h1 className='text-2xl font-bold mb-4'>NUEVA CONTRASEÑA</h1>
                                <p className='text-lg'>Ingrese su nueva contraseña</p>
                            </header>
                            <form onSubmit={handleResetSubmit} className='flex flex-col gap-6'>
                                <fieldset>
                                    <label htmlFor="newPassword" className='font-semibold text-lg mb-2 block'>Nueva contraseña:</label>
                                    <input
                                        placeholder="Ingrese la nueva contraseña"
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className='bg-white border text-base border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:none'
                                    />
                                </fieldset>
                                <span className='py-0.5'></span>
                                {error && (
                                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
                                )}
                                <Submit pending={pending} label="RESTABLECER" />
                                <span
                                    onClick={handleBackToLogin}
                                    className='text-blue-500 hover:underline cursor-pointer text-sm text-center'
                                >
                                    Volver al inicio de sesión
                                </span>
                            </form>
                        </>
                    )}

                    {view === "success" && (
                        <>
                            <header className='my-11'>
                                <h1 className='text-2xl font-bold mb-4'>CONTRASEÑA RESTABLECIDA</h1>
                                <p className='text-lg'>{successMsg}</p>
                            </header>
                            <div className='flex flex-col gap-6'>
                                <span className='py-0.5'></span>
                                <button
                                    onClick={handleBackToLogin}
                                    className='p-2 text-white font-bold cursor-pointer bg-green-700'
                                >
                                    VOLVER AL INICIO DE SESIÓN
                                </button>
                            </div>
                        </>
                    )}
                </aside>
            </div>
        </main>

    )
}

export default Login;
