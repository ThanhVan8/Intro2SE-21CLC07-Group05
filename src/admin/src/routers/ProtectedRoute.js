import React from 'react'
import useAuth from '../custom_hooks/useAuth'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const currentUser = useAuth();

    return currentUser ? children : <Navigate to="/Signin" />
}

export default ProtectedRoute