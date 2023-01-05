import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {  type:String,  required: true },
  body: String,
  creator: String,
  fileImage: { type:String,  required: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Movie = new mongoose.model("Movie", movieSchema);

export default Movie;
