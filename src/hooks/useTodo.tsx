import { client } from "../utils"
import { type Todo, type UseTodoReturn } from "../types"
import { useQuery } from "@tanstack/react-query"

function useTodo(selectedUser: number = 0): UseTodoReturn {
    const { data, isLoading, refetch } = useQuery<Todo[]>({
        queryKey: ["todos", selectedUser],
        queryFn: async () => {
            const url = selectedUser === 0 ? "/todos" : `/todos?userId=${selectedUser}`
            const res = await client.get(url)
            return res.data
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        gcTime: 30 * 60 * 1000,
    })

    return { getTodos: refetch, todos: data ?? [], isLoading }
}

export default useTodo