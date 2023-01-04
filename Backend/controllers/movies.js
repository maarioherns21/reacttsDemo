import Movie from "../Model/movie.js";

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

export const createMovie = async (req, res) => {
  const movie = req.body;
  try {
    const newMovie = new Movie({ ...movie });

    const saveMovie = await newMovie.save();

    res.status(200).json(saveMovie);
  } catch (error) {
    console.log(error);

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
