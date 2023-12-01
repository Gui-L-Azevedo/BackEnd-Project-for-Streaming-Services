import mongoose from "../../database/index.js";

const showsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  cast: {
    required: true,
    type: String,
  },
  country: {
    required: true,
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
  rating: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  seasons: {
    type: Number,
    required: true,
  },
  featuredImage: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("showsSchema", showsSchema);
