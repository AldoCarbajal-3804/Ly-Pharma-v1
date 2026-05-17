import { useState } from 'react'

import menu from '../assets/icons/menu.svg'
import home from '../assets/icons/home.svg'
import products from '../assets/icons/products.svg'
import sales from '../assets/icons/sales.svg'
import reports from '../assets/icons/reports.svg'
import config from '../assets/icons/config.svg'

import { ButtonNavbar } from '../components/ButtonNavbar'
import Inicio from '../views/Inicio'

function Principal() {

    const date = new Date()
    const today = date.toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const time = date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })

    const [isOpen, setOpen] = useState(false)
    const [isActive, setActive] = useState(true)
    const [activeTab, setActiveTab] = useState("INICIO")
    
    const handleOpen = () => setOpen(!isOpen)
    
    return(
        <main className="flex h-screen w-full bg-gray-50" id="principal">
            <nav 
                className={`h-full bg-emerald-800 text-white transition-all duration-300 flex flex-col shadow-xl z-20 ${
                    isOpen ? 'w-64' : 'w-20'
                }`}
            >
                <header className="flex items-center justify-center border-b border-emerald-700 h-16">
                    <button 
                        onClick={handleOpen} 
                        className="cursor-pointer w-full h-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
                    >
                        <img src={menu} alt="Menu" className="w-6" />
                    </button>
                </header>
                
                <aside className="flex flex-col gap-2 pt-6 overflow-x-hidden">
                    <ButtonNavbar 
                        icon={home}
                        text="INICIO"
                        onClick={(() => setActiveTab("INICIO"))}
                        onActive={isActive}
                        onOpen={isOpen}
                    />
                    <ButtonNavbar 
                        icon={products}
                        text="PRODUCTOS"
                        onClick={() => setActiveTab("PRODUCTOS")}
                        onActive={!isActive}
                        onOpen={isOpen}
                    />
                    <ButtonNavbar 
                        icon={sales}
                        text="VENTAS"
                        onClick={() => setActiveTab("VENTAS")}
                        onActive={!isActive}
                        onOpen={isOpen}
                    />
                    <ButtonNavbar 
                        icon={reports}
                        text="REPORTES"
                        onClick={() => setActiveTab("REPORTES")}
                        onActive={!isActive}
                        onOpen={isOpen}
                    />
                    <ButtonNavbar 
                        icon={config}
                        text="CONFIGURACIÓN"
                        onClick={() => setActiveTab("CONFIGURACIÓN")}
                        onActive={!isActive}
                        onOpen={isOpen}
                    />
                </aside>
            </nav>

            <article className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 transition-all">
                    <section className="flex items-center gap-4 text-gray-600">
                        <date className="flex flex-col">
                            <span className="uppercase font-bold text-emerald-700 tracking-tight">Fecha Actual</span>
                            <span className="text-sm font-medium capitalize">{today}</span>
                        </date>
                        
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        
                        <time className="flex flex-col">
                            <span className="uppercase font-bold text-emerald-700 tracking-tight">Hora</span>
                            <span className="text-sm font-bold text-gray-800">{time}</span>
                        </time>
                    </section>

                    <section className="flex items-center gap-4">
                    </section>
                </header>
                
                <aside id="windows" className="p-8 overflow-y-auto bg-gray-50 flex-1">
                    {activeTab === "INICIO" && <Inicio />}
                </aside>
            </article>

        </main>    
    )

}    

export default Principal;