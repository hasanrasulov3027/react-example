import Sidebar from "./component/Sidebar"
import { Outlet } from "react-router-dom"

function Admin() {
    return (
        <div className="d-flex" >
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Admin