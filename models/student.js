const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  placed: {
    type: String,
    required: true,
  },
  reactScore: {
    type: Number,
    required: true,
  },
  webdScore: {
    type: Number,
    required: true,
  },
  dsaScore: {
    type: Number,
    required: true,
  },
  interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
