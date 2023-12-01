import mongoose from "../../database/index.js";

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  directors: {
    type: String,
    required: true,
  },
  cast: {
    required: true,
    type: String,
  },
  country: {
    required: false,
    type: String,
  },
  dateAddedtoPlatform: {
    type: Date,
    required: true,
    default: Date.now,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    required: false,
  },
  images: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("MoviesSchema", moviesSchema);
