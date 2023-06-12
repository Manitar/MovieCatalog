/* IMPORTS */
import movieRoutes from "./routes/movies.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import { addMovie } from "./controllers/movies.js"
import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cookieParser from 'cookie-parser'
import { config as dotenvConfig } from 'dotenv';

/* CONFIGURATION */

const app = express()
app.use(express.json());
app.use(cookieParser())
dotenvConfig();

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Allow requests from http://localhost:3001
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/* STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/images');
  },
  filename: function (req, file, cb) {
    // For testing
    console.log(file)

    cb(null, Date.now() + '-' + file.originalname)
  },
})
const upload = multer({ storage: storage })

/* .env info */
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

/* ROUTES WITH FILES */
app.post("/movies/addMovie", upload.single("picture"), addMovie);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);



/* Connect to MONGODB */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));