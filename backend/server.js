const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// MongoDB Connection

mongoose
  .connect("mongodb://127.0.0.1:27017/canvasx")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });


// Schema & Model

const ProjectSchema = new mongoose.Schema(
  {
    blocks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

// Routes


// Save project
app.post("/save", async (req, res) => {
  try {
    const { blocks } = req.body;

    await Project.findOneAndUpdate(
      {},
      { blocks },
      { upsert: true, new: true }
    );

    res.json({ message: "Project saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save project" });
  }
});

// Load project
app.get("/load", async (req, res) => {
  try {
    const project = await Project.findOne({});
    res.json(project ? project.blocks : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to load project" });
  }
});

// Health check (optional but professional)
app.get("/", (req, res) => {
  res.send("CanvasX backend is running");
});


// Start Server

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});