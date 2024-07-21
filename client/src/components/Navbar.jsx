import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { Logout } from './Logout'
import { AddMovie } from './AddMovie'

export const Navbar = () => {
  return (
    <nav className='primary-nav' style={{ display: 'flex', justifyContent: 'center' }}>
      <NavLink to='/home'>
        <Button variant="contained">Home</Button>
      </NavLink>
      <AddMovie />
      <Logout />
    </nav>
  )
}

export default Navbar