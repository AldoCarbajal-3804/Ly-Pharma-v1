import { useState } from "react";
import banner from '../assets/banner.webp';

function Submit({pending}){
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
            ) : 'INICIAR SESIÓN'}
        </button>
    );

}


function Login(){

    const [pending, setPending] = useState(false);
    
    return(

        <main id="login" className='flex justify-center items-center min-h-screen'>
            <div className='flex'>
                <figure className='flex items-center'>
                    <img src={banner} alt="Banner de Ly Pharma" className='w-70' />
                </figure>

                <aside className='bg-emerald-100 px-14 flex flex-col'>
                    <header className='my-11'>
                        <h1 className='text-2xl font-bold mb-4'>INICIAR SESIÓN</h1>
                        <p className='text-lg'>Inicie sesión para ingresar al programa</p>
                    </header>
                    <form className='flex flex-col gap-6'>
                        
                        <fieldset >
                            <label htmlFor="username" className='font-semibold text-lg mb-2 block'>Usuario:</label>
                            <input 
                                placeholder="Ingrese su usuario" 
                                type="text" 
                                id="username" 
                                name="username" 
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
                                className='bg-white border text-base border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:none'
                            />
                        </fieldset>
                        <span className='py-0.5'></span>
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
                            <span className='text-blue-500 hover:underline cursor-pointer text-sm'>Olvidaste tu contraseña?</span>
                        </div>
                        <span className='py-0.5'></span>
                        <Submit pending={pending} />
                    </form>
                </aside>
            </div>
        </main>

    )
}

export default Login;