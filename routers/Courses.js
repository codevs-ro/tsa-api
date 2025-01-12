const express = require("express");
const router = express.Router();
const models = require("../models");
const Courses = models.Courses;

// Routes

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Courses.findAll();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all courses by author id
router.get("/author/:authorId", async (req, res) => {
  try {
    const courses = await Courses.findAll({
      where: { authorId: req.params["authorId"] },
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params["id"]);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET course by title
router.get("/:title", async (req, res) => {
  try {
    const course = await Courses.findAll({
      where: { title: req.params["title"] },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new course
router.post("/", async (req, res) => {
  try {
    const { title, authorId, description, icon } = req.body;
    if (!title || !authorId) {
      return res.status(400).json({ error: "Missing essential fields" });
    }
    const newCourse = {
      title: title,
      authorId: authorId,
      description: description,
      dateOfCreation: new Date(),
      icon: icon,
    };
    await Courses.create(newCourse);
    res.json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT modify course by id
router.put("/:id", async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params["id"]);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.update(req.body);
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE course by id
router.delete("/:id", async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params["id"]);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.destroy();
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
