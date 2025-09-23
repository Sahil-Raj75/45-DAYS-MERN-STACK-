const express = require('express');
const Project = require('../model/Project');
const Skill = require('../model/Skill');
const Experience = require('../model/Experience');

const router = express.Router();

router.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/profile/dashboard', async (req, res) => {
  try {
    const projects = await Project.find().limit(3).populate('technologies');
    const skills = await Skill.find();
    const experiences = await Experience.find().sort({ startDate: -1 }).limit(3);

    res.json({ projects, skills, experiences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/profile/portfolio', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('technologies')
      .populate('experience');
    const experiences = await Experience.find().populate('technologies');
    const skills = await Skill.find();

    res.json({ projects, experiences, skills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const regex = new RegExp(query, 'i');

    const projects = await Project.find({ title: regex });
    const skills = await Skill.find({ name: regex });
    const experiences = await Experience.find({ company: regex });

    res.json({ projects, skills, experiences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/analytics/skills', async (req, res) => {
  try {
    const skillsCount = await Project.aggregate([
      { $unwind: "$technologies" },
      { $group: { _id: "$technologies", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json(skillsCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/analytics/career', async (req, res) => {
  try {
    const careerTimeline = await Experience.find().sort({ startDate: 1 });
    res.json(careerTimeline);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/analytics/technology', async (req, res) => {
  try {
    const techTrends = await Experience.aggregate([
      { $unwind: "$technologies" },
      { $group: { _id: "$technologies", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json(techTrends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
