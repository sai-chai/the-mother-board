import mongoose from "mongoose";

export const OpportunitySchema = new mongoose.Schema({
   id: Number,
   title: String,
   company: String,
   url: String,
   domain: {
      type: [String, null],
      required: true
   }
});

export default mongoose.models.Opportunity ||
   mongoose.model("Opportunity", OpportunitySchema, "job-opportunities");
