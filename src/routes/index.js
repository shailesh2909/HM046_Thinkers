const express = require("express");
const router = express.Router();

// Import route modules
const companiesRoutes = require("./companies");
const projectsRoutes = require("./projects");
const applicationsRoutes = require("./applications");

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running"
  });
});

// Mount routes
router.use("/companies", companiesRoutes);
router.use("/projects", projectsRoutes);
router.use("/applications", applicationsRoutes);

module.exports = router;
