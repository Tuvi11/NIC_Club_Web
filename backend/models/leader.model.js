import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["President", "Vice President"],
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  photo: { type: String, required: true },
});

const Leader = mongoose.model("Leader", leaderSchema);
export default Leader;
