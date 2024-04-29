import { getToken } from "@/utils/token"
import { Navigate } from "react-router-dom"

//高阶组件
const AuthRoute = ({ children }) => {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace />
    }
}

export default AuthRoute