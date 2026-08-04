const Skill = require('../models/Skill');
const { getDb } = require('../config/db');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      return res.status(200).json({ success: true, count: dbInfo.data.skills.length, data: dbInfo.data.skills });
    }

    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    console.error('Skills Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve skills list' });
  }
};

// @desc    Create skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const newSkill = {
        _id: 'm-skill-' + Date.now(),
        ...req.body,
        createdAt: new Date()
      };
      dbInfo.data.skills.push(newSkill);
      return res.status(201).json({ success: true, data: newSkill });
    }

    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    console.error('Skill Create Error:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to add skill record' });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const skillIndex = dbInfo.data.skills.findIndex(s => s._id === id);
      if (skillIndex === -1) return res.status(404).json({ success: false, message: 'Skill not found' });

      const updatedSkill = {
        ...dbInfo.data.skills[skillIndex],
        ...req.body,
        updatedAt: new Date()
      };
      dbInfo.data.skills[skillIndex] = updatedSkill;
      return res.status(200).json({ success: true, data: updatedSkill });
    }

    const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    console.error('Skill Update Error:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update skill record' });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const dbInfo = getDb();
    if (dbInfo.isMock) {
      const skillIndex = dbInfo.data.skills.findIndex(s => s._id === id);
      if (skillIndex === -1) return res.status(404).json({ success: false, message: 'Skill not found' });

      dbInfo.data.skills.splice(skillIndex, 1);
      return res.status(200).json({ success: true, message: 'Skill record deleted successfully' });
    }

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.status(200).json({ success: true, message: 'Skill record deleted successfully' });
  } catch (error) {
    console.error('Skill Delete Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete skill record' });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
