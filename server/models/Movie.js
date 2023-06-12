import mongoose from "mongoose"
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  movieName: { type: String, required: true },
  imagePath: { type: String, required: true },
  likedCount: { type: Number, default: 0 }
}, { timestamps: true })

const Movie = mongoose.model("Movie", MovieSchema)
export default Movie;
