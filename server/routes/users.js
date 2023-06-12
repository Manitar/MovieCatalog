import express from "express";
import { getUsers, userLikeMovie, addUser } from "../controllers/users.js"
const router = express.Router();

/* GET */
router.get("/getUsers", getUsers)


/* POST */
// Register

// Dummy function
router.post("/addUser", addUser)

/* PATCH */
router.patch("/:userId/like/:movieId", userLikeMovie)

export default router;