import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ProtectedRoute({children, roles}) {
    const login = useSelector((state) => state.login)
    const isAuthorised = login.loggedIn && roles.includes(login.userType)
    return isAuthorised ? children : <Navigate to="/login" replace />;
}
