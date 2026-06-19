import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../hooks/useAuth"
import { getProfile } from "../services/perfilService"

export function usePerfilCache() {
    const { user } = useAuth()

    return useQuery({
        queryKey: ["perfil"],
        queryFn: () => getProfile(user.token),
        enabled: !!user?.token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}
