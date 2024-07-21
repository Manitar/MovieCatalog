import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAuth } from './auth'
import { Button } from '@mui/material'

export const Logout = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    try {
      Cookies.remove('jwt')
      // auth.logout() THIS LINE IS PROBLEMATIC FOR SOME REASON
      navigate('/')
    }
    catch (error) {
    }
  }
  return (
    <Button onClick={handleLogout} variant="contained">Logout</Button>
  )
}
