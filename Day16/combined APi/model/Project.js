const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' },
  year: Number
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
