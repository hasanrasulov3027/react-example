import { toast } from "react-toastify"
import useTodo from "../hooks/useTodo"
import { client } from "../utils"
import SelectBox from "../components/SelectBox"
import { useState } from "react"
import useUsers from "../hooks/useUsers"
import { type Todo as TodoType } from "../types"
import { type ReactElement } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function Todo(): ReactElement {
    const [selectedUser, setSelectedUser] = useState<number>(0)
    const { getTodos, todos, isLoading } = useTodo(selectedUser)
    const { users } = useUsers()
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: async (todo: TodoType) => {
            await client.patch(`/todos/${todo.id}`, { completed: !todo.completed })
        },
        onSuccess: async () => {
            toast.success("Todo updated")
            await queryClient.invalidateQueries({ queryKey: ["todos", selectedUser] })
            getTodos()
        },
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    const editTodo = async (todo: TodoType): Promise<void> => {
        await mutateAsync(todo)
    }

    return (
        <div>
            <h1>Todo List</h1>
            <SelectBox selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} />
            {todos.map((todo: TodoType) => (
                <div key={todo.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
                    <h3>{todo.title}</h3>
                    <input onChange={() => editTodo(todo)} checked={todo.completed} type="checkbox" />
                </div>
            ))}
        </div>
    )
}

export default Todo