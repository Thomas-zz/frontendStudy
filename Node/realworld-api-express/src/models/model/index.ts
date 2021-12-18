import mongoose from "mongoose";
import userModel from "./user";

const model = {
  User: mongoose.model("User", userModel),
}

export = model ;
