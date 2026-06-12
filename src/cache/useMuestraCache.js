import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../hooks/useAuth"
import { getMuestra } from "../services/muestraService"

export function useMuestraCache() {
    const { user } = useAuth()

    return useQuery({
        queryKey: ["muestra"],
        queryFn: () => getMuestra(user.token),
        enabled: !!user?.token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}
