import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../hooks/useAuth"
import { getStockBajo, getStockVencido } from "../services/productService"

export function useAlertsCache() {
    const { user } = useAuth()

    return useQuery({
        queryKey: ["alerts"],
        queryFn: async () => {
            const [stockBajo, stockVencido] = await Promise.all([
                getStockBajo(user.token),
                getStockVencido(user.token),
            ])
            return [
                ...(stockBajo || []).map(p => ({
                    name: p.nombre,
                    stock: p.stock,
                    badge: "CRÍTICO",
                    badgeColor: "orange",
                })),
                ...(stockVencido || []).map(p => ({
                    name: p.nombre,
                    stock: p.stock,
                    badge: "VENCIMIENTO",
                    badgeColor: "red",
                })),
            ]
        },
        enabled: !!user?.token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}
