import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  body: String,
  creator: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
