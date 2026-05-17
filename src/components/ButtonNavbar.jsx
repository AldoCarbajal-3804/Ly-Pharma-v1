export const ButtonNavbar = ({ icon, text, onClick, onOpen, onActive }) => {
    return(
        <button 
            onClick={onClick} 
            className={`relative flex items-center gap-3 px-4 py-3 w-full transition cursor-pointer hover:bg-emerald-700 ${onActive ? 'bg-emerald-600' : ''}`}
        >
            <img src={icon} alt="Icono" />            
            {onOpen && <span className="font-medium text-white">{text}</span>}
        </button>
    )
}