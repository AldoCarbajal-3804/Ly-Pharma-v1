const DEV_API = import.meta.env.DEV ? '' : null;
const API_URL = import.meta.env.VITE_RUTA_API || DEV_API || 'https://ly-pharma-backend.vercel.app';
export const URL = `${API_URL}/api`
