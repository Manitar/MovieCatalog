import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import { MovieForm } from '../components/MovieForm'
import { Typography } from '@mui/material'
function PostMoviePage() {
  return (
    <Box>
      <Navbar />
      <MovieForm />
    </Box>
  )
}

export default PostMoviePage