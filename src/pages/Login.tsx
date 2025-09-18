// src/pages/Login.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../utils";
import { toast } from "react-toastify";
import { use } from "react";

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        console.log("Login submitted", data);
        client.get("/users?email=" + data.email).then(res => {
            if (res.data.length === 0) {
                toast.error("User not found with this email.");
                return;
            } else {
                let user = res.data[0];
                if (user.password !== data.password) {
                    toast.error("Incorrect password.");
                    return;
                } else {
                    localStorage.setItem("accessToken", user.id);
                    navigate("/");
                }
            }
        })
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email.message}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" },
                            })}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password.message}</div>
                        )}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center text-muted mt-3">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-primary">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
