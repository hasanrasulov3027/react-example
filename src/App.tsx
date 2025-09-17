import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Todo from "./pages/Todo"
import Comment from "./pages/Comment"
import MyContextApi from "./hooks/MyContextApi"
import { use, type ReactElement } from "react"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import { useContextApi } from "./hooks/useContextApi"
import PrivateRoute from "./utils"
import ProtectedRoute from "./utils"


function App(): ReactElement {

    const { state } = useContextApi()

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/admin" element={
                    <ProtectedRoute isAllowed={!!state.user && state.user.roles.includes("admin")}>
                        <Admin />
                    </ProtectedRoute>
                } />
                <Route path="/comment" element={<Comment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App