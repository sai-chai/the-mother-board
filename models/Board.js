import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
   name: String,
   rating: String,
   root_domain: String,
   logo_file: String,
   description: String
});

export default mongoose.models.Board ||
   mongoose.model("Board", BoardSchema, "job-boards");
