const express = require("express");
const cors = require("cors");

const routes = require("./routes"); // add routes later

const app = express();

app.use(cors());
app.use(express.json());

// base route
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// API routes
app.use("/api", routes);

module.exports = app;
