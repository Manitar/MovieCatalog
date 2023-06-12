import User from "../models/User.js"
import Movie from "../models/Movie.js"
// Dummy get for testing
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  }
  catch (error) {
    res.status(500).json({ error: "Could not get users" })
  }
}

// Dummy add for testing
export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, likedMovies } = req.body
    const newUser = new User({ firstName, lastName, email, password, likedMovies })
    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  }
  catch (error) {
    res.status(500).json({ error: "Failed to add user to database" })
  }
}

export const userLikeMovie = async (req, res) => {
  try {
    const userId = req.params.userId
    const movieId = req.params.movieId
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ error: "User not found " })
    }
    user.likedMovies.push(movieId);
    await user.save();

    res.json({ message: "User liked successfully!" })
  }
  catch (error) {
    res.status(500).json({ error: "Could not like movie" })
  }
}