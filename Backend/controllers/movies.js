import Movie from "../Model/movie.js";
import multer from "multer"


//------------------------ multer -----------------------------
// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}. ${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

export const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});
//------------------------ multer -----------------------------

export const createMovie = async (req, res) => {
  try {
    const { name, creator, body } = req.body;
    const {filename} = req.file;

    const newMovie = new Movie({ name: name,  body: body, creator: creator, fileImage : filename });
     console.log(newMovie)
    const saveMovie = await newMovie.save();

    res.status(201).json({ status: 201, saveMovie });
  } catch (error) {
    console.log(error.message)


    res.status(401).json({ error : error.message });
  }
};

export const index = async (req, res) => {
  const movies = Movie;
  try {
    const data = await movies.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = req.body;

    const { id } = req.params;

    const updateMovie = { ...movie, _id: id };

    const data = await Movie.findByIdAndUpdate(id, updateMovie, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Movie.findByIdAndDelete(id);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(404).json({ error: error.message });
  }
};
