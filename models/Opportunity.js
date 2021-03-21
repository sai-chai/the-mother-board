import mongoose from "mongoose";

const OpportunitySchema = new mongoose.Schema({
   id: Number,
   title: String,
   company: String,
   url: String
});

export default mongoose.models.Opportunity ||
   mongoose.model("Opportunity", OpportunitySchema, "job-opportunities");
