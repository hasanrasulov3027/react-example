import { client } from "../utils"
import { type Post, type UsePostReturn } from "../types"
import { useQuery } from "@tanstack/react-query"

function usePost(selectedUser: number = 0): UsePostReturn {
    const { data, isLoading } = useQuery<Post[]>({
        queryKey: ["posts", selectedUser],
        queryFn: async () => {
            const url = selectedUser === 0 ? "/posts" : `/posts?userId=${selectedUser}`
            const res = await client.get(url)
            return res.data
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        gcTime: 30 * 60 * 1000,
    })

    return { posts: data ?? [], isLoading }
}

export default usePost