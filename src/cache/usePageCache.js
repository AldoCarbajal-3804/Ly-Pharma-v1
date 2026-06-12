import { useQuery } from "@tanstack/react-query"

export function usePageCache(queryKey, queryFn, options = {}) {
    return useQuery({
        queryKey,
        queryFn,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        ...options,
    })
}
