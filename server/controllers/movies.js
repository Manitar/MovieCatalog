import Movie from "../models/Movie.js"
import User from "../models/User.js";
import { startSession } from 'mongoose';
/* GET */
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies)
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" })
  }

}

export const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id
    const movie = await Movie.findById(movieId)

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" })
    }

    res.json(movie)
  }
  catch (error) {
    return res.status(500).json({ error: "Failed to fetch movie" })
  }
}

export const addMovie = async (req, res) => {
  try {
    const { movieName, imagePath, releaseDate } = req.body

    const newMovie = new Movie({ movieName, imagePath, releaseDate, likedCount: 0 })
    const savedMovie = await newMovie.save()

    res.status(201).json(savedMovie);
  }
  catch (error) {
    res.status(500).json({ error: "Could not add movie to database" })
  }

}


export const addLikeToMovie = async (req, res) => {
  let session
  try {

    const session = await Movie.startSession() // Start new session
    session.startTransaction()
    const movieId = req.params.movieId
    const email = req.params.email

    const movie = await Movie.findById(movieId).session(session)
    const user = await User.findOne({ email: email }).session(session)
    if (!movie) {
      await session.abortTransaction()
      session.endSession()
      res.status(404).json({ error: "Movie not found" })
    }

    const whichLike = req.params.like
    if (whichLike === '1') { movie.likedCount += 1 }
    if (whichLike === '-1') { movie.likedCount -= 1 }

    await movie.save()

    if (!user) {
      await session.abortTransaction()
      session.endSession()
      res.status(404).json({ error: "User not found" })
    }

    user.likedMovies.push(movie._id)

    await user.save()

    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session

    res.json(movie)
  }
  catch (error) {
    await session.abortTransaction(); // Abort the transaction if an error occurs
    session.endSession(); // End the session
    res.status(500).json({ error: "Could not like movie" })
  }

}

export const removeLikeFromMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId
    const movie = await Movie.findById(movieId)

    if (!movie) {
      res.status(404).json({ error: "Movie not found" })
    }
    movie.likedCount -= 1
    await movie.save()

    res.json(movie)
  }
  catch (error) {
    res.status(500).json({ error: "Could not like movie" })
  }

}

export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId
    const deleted = await Movie.deleteOne({ _id: movieId })
    if (!deleted) {
      res.status(404).json({ error: 'Movie to delete not found' })
    }
    // Send the whole movie list again
    return await getAllMovies(req, res)
  }
  catch (error) {
    res.status(500).json({ error: "Could not delete movie or get all movies" })
  }
}