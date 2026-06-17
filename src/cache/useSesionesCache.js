import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../hooks/useAuth"
import { getSesiones } from "../services/sesionesServices"

export function useSesionesCache() {
    const { user } = useAuth()

    return useQuery({
        queryKey: ["sesiones"],
        queryFn: () => getSesiones(user.token),
        enabled: !!user?.token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (res) => res.data ?? res ?? [],
    })
}
