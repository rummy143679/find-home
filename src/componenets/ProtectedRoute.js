import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ProtectedRoute({children, roles}) {

    console.log("roles",roles)
    const login = useSelector((state) => state.login)
    console.log("auth",roles.includes(login.userType))

    const isAuthorised = login.loggedIn && roles.includes(login.userType)
    console.log(isAuthorised)

    return isAuthorised ? children : <Navigate to="/login" replace />;
}
