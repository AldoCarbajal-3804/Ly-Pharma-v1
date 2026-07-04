const API_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_RUTA_API || 'https://ly-pharma-backend.vercel.app');
export const URL = `${API_URL}/api`
