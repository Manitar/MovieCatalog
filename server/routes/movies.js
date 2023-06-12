import express from "express";
import { getAllMovies, getMovieById, addMovie, addLikeToMovie, removeLikeFromMovie, deleteMovie } from "../controllers/movies.js"
const router = express.Router();

/* GET */
// Get all movies
router.get("/getMovies", getAllMovies)
// Get specific movie
router.get("/:id", getMovieById)

/* POST */
router.post("/addMovie", addMovie)

/* PATCH */
router.patch("/:movieId/:like/:email", addLikeToMovie)
router.patch("/:movieId/unlike/:email", removeLikeFromMovie)

/* DELETE */
router.delete("/:movieId", deleteMovie)

export default router;