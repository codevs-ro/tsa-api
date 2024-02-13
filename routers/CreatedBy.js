const express = require("express");
const router = express.Router();
const { CreatedBy, Courses } = require("../models");

// Routes

// GET all courses created by user with userId
router.get("/author/:userId", async (req, res) => {
  try {
    // Get all courseID created by user with userId
    const courseIds = await CreatedBy.findAll({
      where: { userId: req.params["userId"] },
    });
    // Get all courses with courseIds
    const courses = await Promise.all(
      courseIds.map(async (courseId) => {
        return await Courses.findByPk(courseId.courseId);
      })
    );
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new course created by user
router.post("/", async (req, res) => {
  try {
    const createdBy = req.body;
    await CreatedBy.create(createdBy);
    res.json(createdBy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
