import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export default function Company() {
    const user = useSelector(state=>state.isLoggedIn)
    if (!user) {
        return <Navigate to='/login'></Navigate>
    }
    return (
    <div>
      
    </div>
  )
}
