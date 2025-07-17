const mongoose = require('mongoose');

const taskSubmissionSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  fileType: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TaskSubmission', taskSubmissionSchema);
