import mongoose from 'mongoose';

const clubRecruitmentSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },

  registration: {
    domain: { type: String },
    formLink: { type: String },
    whatsappLink: { type: String },
    taskLink: {type: String}
  },

  task: {
    uploads: [
      {
        fileUrl: String,
        fileType: String, // image, file, or link
        submittedAt: { type: Date, default: Date.now }
      }
    ]
  },

  interview: {
    meetLink: { type: String }
  }
});

export default mongoose.model('ClubRecruitment', clubRecruitmentSchema);
