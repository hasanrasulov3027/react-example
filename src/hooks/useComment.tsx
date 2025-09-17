import { client } from "../utils"
import { useParams } from "react-router-dom"
import { type Comment, type UseCommentReturn } from "../types"
import { useQuery } from "@tanstack/react-query"

function useComment(): UseCommentReturn {
    const { postId } = useParams<{ postId: string }>()

    const { data, isLoading } = useQuery<Comment[]>({
        queryKey: ["comments", postId],
        enabled: Boolean(postId),
        queryFn: async () => {
            const res = await client.get(`/comments?postId=${postId}`)
            return res.data
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        gcTime: 30 * 60 * 1000,
    })

    return { comments: data ?? [], isLoading }
}

export default useComment