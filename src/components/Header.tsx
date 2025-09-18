import { Link } from "react-router-dom";
import { useContextApi } from "../hooks/useContextApi";
import { useState } from "react";

function Header() {
    const { state, dispatch } = useContextApi(); // assuming you have a logout function
    const [open, setOpen] = useState(false);
    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">
                    MyApp
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/todo">
                                Todo
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        {state.user ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-danger dropdown-toggle"
                                    onClick={() => setOpen(!open)}
                                >
                                    {state.user.name}
                                </button>
                                <ul
                                    className={`dropdown-menu dropdown-menu-end ${open ? "show" : ""
                                        }`}
                                >
                                    <li>
                                        <button className="dropdown-item">Profile</button>
                                    </li>
                                    {
                                        state.user?.roles.includes("ADMIN") &&
                                        <li>
                                            <Link className="dropdown-item" to="/admin">
                                                Admin
                                            </Link>
                                        </li>
                                    }

                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={() => dispatch({ type: "LOG_OUT" })}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link className="btn btn-outline-light" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
