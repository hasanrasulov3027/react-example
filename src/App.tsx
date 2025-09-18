import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Todo from "./pages/Todo"
import Comment from "./pages/Comment"
import MyContextApi from "./hooks/MyContextApi"
import { use, useContext, type ReactElement } from "react"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/admin/Admin"
import ProtectedRoute from "./utils"
import Settings from "./pages/admin/Settings"
import Users from "./pages/admin/Users"
import Report from "./pages/admin/Report"


function App(): ReactElement {


    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={
                    <ProtectedRoute role={"USER"}>
                        <Todo />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute role={"ADMIN"}>
                        <Admin />
                    </ProtectedRoute>

                } >
                    <Route path="/admin/users" element={
                        <ProtectedRoute role={"SUPER_ADMIN"} >
                            <Users />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/reports" element={<Report />} />
                    <Route path="/admin/settings" element={<Settings />} />
                </Route>
                <Route path="/comment" element={<Comment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App