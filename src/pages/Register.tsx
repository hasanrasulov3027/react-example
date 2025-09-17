// src/pages/Register.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { client } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormInputs>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        const { confirmPassword, ...submitData } = data;
        client.get("/users?email=" + data.email).then(res => {
            if (res.data.length > 0) {
                toast.error("Email is already registered.");
                return;
            } else {
                registerUser(submitData);
            }
        })
    };

    function registerUser(submitData: Omit<RegisterFormInputs, "confirmPassword">) {
        client.post("/users", submitData).then(() => {
            toast.success("Registration successful!");
            navigate("/login");
        }).catch(() => {
            toast.error("Registration failed. Please try again.");
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "420px" }}>
                <h2 className="text-center mb-4">Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name.message}</div>
                        )}
                    </div>

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
                            className={`form-control ${errors.password ? "is-invalid" : ""
                                }`}
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

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                                }`}
                            placeholder="Re-enter your password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <div className="invalid-feedback">
                                {errors.confirmPassword.message}
                            </div>
                        )}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-success w-100">
                        Register
                    </button>
                </form>

                <p className="text-center text-muted mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
