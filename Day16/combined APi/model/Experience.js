const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: Date,
  endDate: Date,
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
