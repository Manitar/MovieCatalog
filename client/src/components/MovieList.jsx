import Movie from "./Movie"
import { useContext, useState, useEffect } from "react"
import AppContext from "../AppContext"
import axios from "axios"
import { Box } from "@mui/material"

function MovieList() {
  const baseUrl = useContext(AppContext).baseUrl
  const [movieList, setMovieList] = useState(null)
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/movies/getMovies`)
      setMovieList(response.data)
    }
    catch (error) {

    }
  }
  useEffect(() => {
    fetchMovies()
  }, [])
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {movieList && movieList.map(movie => (
        <Movie key={movie._id} movie={movie} />
      ))}
    </Box>
  )
}


export default MovieList;