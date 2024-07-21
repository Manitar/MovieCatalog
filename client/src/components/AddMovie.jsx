import React from 'react'
import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';

export const AddMovie = () => {
  const navigate = useNavigate()
  const postMovie = () => {
    navigate("/add")
  }
  return (
    <Button onClick={postMovie} variant="contained">Post Movie</Button>
  )
}

// Add movies and delete movies
