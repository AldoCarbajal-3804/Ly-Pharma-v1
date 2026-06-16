import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../hooks/useAuth"
import { getVentas, addVentas } from "../services/ventaService"

export function useVentasCache() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ["ventas"],
        queryFn: () => getVentas(user.token),
        enabled: !!user?.token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        select: (res) => res.data ?? res ?? [],
    })

    const mutation = useMutation({
        mutationFn: (venta) => addVentas(user.token, venta),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ventas"] })
        },
    })

    return { ...query, mutation }
}
