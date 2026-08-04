const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Mobile Development', 'AI & Automation', 'Product & Innovation']
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 80
  }
}, { timestamps: true });


module.exports = mongoose.model('Skill', SkillSchema);
