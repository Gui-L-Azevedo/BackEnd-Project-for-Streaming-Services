import { Schema } from "mongoose";
import mongoose from "../../database/index.js";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetTokenExpiration: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  administrador: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => {
      console.error("Error hashing password", error);
    });
});

export default mongoose.model("User", UserSchema);
