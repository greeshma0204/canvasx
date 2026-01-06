const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// SAVE / UPDATE PROJECT
router.post("/save", async (req, res) => {
  const { blocks } = req.body;

  try {
    const project = await Project.findOneAndUpdate(
      { name: "default" },
      { blocks, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOAD PROJECT
router.get("/load", async (req, res) => {
  try {
    const project = await Project.findOne({ name: "default" });
    res.json(project || { blocks: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;