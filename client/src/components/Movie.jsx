import { Box } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useContext } from "react";
import AppContext from "../AppContext";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import Cookies from "js-cookie";
// movieName: { type: String, required: true },
// imagePath: { type: String, required: true },
// likedCount: { type: Number, default: 0 }
function Movie({ movie }) {
  const [liked, setLiked] = useState(false)
  const baseUrl = useContext(AppContext).baseUrl
  const [likes, setLikes] = useState(movie.likedCount)
  const [isError, setIsError] = useState(false)
  const email = jwt_decode(Cookies.get('jwt')).email
  const clickUnlike = async () => {
    try {
      const response = await axios.patch(`${baseUrl}/movies/${movie._id}/-1/${email}/`, movie)

      const updatedMovie = response.data
      setLiked(!liked);
      setLikes(updatedMovie.likedCount);
    }
    catch (error) {
      setIsError(true)
    }
  };
  const clickLike = async () => {
    // router.patch("/:userId/like/:movieId", userLikeMovie) I'll do this after
    // router.patch("/:movieId/like/", addLikeToMovie)
    try {

      const response = await axios.patch(`${baseUrl}/movies/${movie._id}/1/${email}/`, movie)
      const updatedMovie = response.data
      setLiked(!liked);
      setLikes(updatedMovie.likedCount);
    }
    catch (error) {
      setIsError(true)
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px', height: '100px', width: '100px' }}>
        {`${movie.movieName}`}
        {/* <img src={`../images/${movie.imagePath}`} alt="Movie" /> */}
        <img src={require(`../images/${movie.imagePath}`)} alt="Movie" />

        {liked === true ? <FavoriteIcon onClick={clickUnlike} /> : <FavoriteBorderIcon onClick={clickLike} />}
        {likes}
        <br></br>
        {isError && 'Could not save'}

      </Box>
    </div>
  )
}

export default Movie;