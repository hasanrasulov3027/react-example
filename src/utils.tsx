import axios, { type AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
})


import { Navigate } from "react-router-dom";

interface Props {
    isAllowed : boolean;
    children: React.ReactNode;
}
function ProtectedRoute({ isAllowed, children }: Props) {
    if (!isAllowed) {
        return <Navigate to="/" replace />;
    }
  return (
    children
  )
}

export default ProtectedRoute

