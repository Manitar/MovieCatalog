import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import RegisterForm from './components/RegisterForm.jsx'
import LoginForm from './components/LoginForm.jsx';
import LoginPage from './scenes/LoginPage';
import Movie from './components/Movie';
import MovieList from './components/MovieList';
import AppContext from './AppContext';
import axios from 'axios'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './scenes/HomePage';
import { AuthProvider } from './components/auth';
import jwt_decode from 'jwt-decode'
import { useAuth } from './components/auth';
import { useNavigate } from 'react-router-dom';
import PostMoviePage from './scenes/PostMoviePage';


function App() {
  const baseUrl = 'http://localhost:5000'
  const JWT_SECRET_KEY = "my-secret-key"
  const [errorMessage, setErrorMessage] = useState('')
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [movie, setMovie] = useState(null)
  const [token, setToken] = useState(null)
  const movieId = '6482ff1809924a7993871845'


  // const navigate = useNavigate()
  const fetchMovie = async () => {
    try {
      const response = await axios.get(`${baseUrl}/movies/${movieId}`)
      setMovie(response.data)
    }
    catch (error) {

    }
  }

  return (
    <AuthProvider>
      <AppContext.Provider value={{ baseUrl, JWT_SECRET_KEY, token }}>
        <Router>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="add" element={<PostMoviePage />} />
          </Routes>
        </Router>
      </AppContext.Provider >
    </AuthProvider>
  );
}

export default App;