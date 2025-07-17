import mongoose from 'mongoose';

const dsaRecruitmentSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  welcomeMessage: String,
  formLink: String,
  whatsappLink: String
});

export default mongoose.model('DSARecruitment', dsaRecruitmentSchema);
