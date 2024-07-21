import { useContext, useEffect } from 'react';
import { useAuth } from '../components/auth';
import { Box } from '@mui/material';
import { Logout } from '../components/Logout';
import MovieList from '../components/MovieList';
import { Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie';
import AppContext from "../AppContext";

function HomePage() {
  const auth = useAuth()
  const baseUrl = useContext(AppContext).baseUrl;
  const validateTokenNotLogin = async (token) => {
    try {
      const res = await axios.get(`${baseUrl}/auth/validate`, { params: { token } })
      if (res.status === 202) {
        const decoded = jwt_decode(token)
        auth.login(decoded.firstName + ' ' + decoded.lastName)
        return
      }
    }
    catch (error) {
      console.log("We failed")
    }
  }

  useEffect(() => {
    validateTokenNotLogin(Cookies.get('jwt'))
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Navbar />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Typography variant="h6">Welcome, {auth.user}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MovieList />
      </Box>
    </Box>
  );
};

export default HomePage