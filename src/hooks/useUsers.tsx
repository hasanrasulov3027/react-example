import { client } from "../utils"
import { type User, type UseUsersReturn } from "../types"
import { useQuery } from "@tanstack/react-query"

function useUsers(): UseUsersReturn {
    const { data, isLoading } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await client.get("/users")
            return res.data
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        gcTime: 30 * 60 * 1000,
    })

    return { users: data ?? [], isLoading }
}

export default useUsers