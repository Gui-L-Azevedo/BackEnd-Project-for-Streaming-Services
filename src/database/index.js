import mongoose from "mongoose";

mongoose.connect("YOUR LINK HERE", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

export default mongoose;
