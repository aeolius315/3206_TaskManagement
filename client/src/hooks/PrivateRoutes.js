import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = (token) => {
    let auth = localStorage.getItem("userID");

    return(
        auth? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes