// models/memberModel.js
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
  team: String,
  year: String,
  branch: String,
  linkedin: String,
  github: String,
  photo: String,
});

export default mongoose.model('Member', memberSchema);
