import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router'

const Protected = ({children}) => {
    const {loading,user}=useAuth()
    const navigate=useNavigate()
    
    if (loading){
        return <p>Loading...</p>
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }
    return children
}

export default Protected
