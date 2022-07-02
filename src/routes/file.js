const express = require("express");
const fileRoute = express.Router();
const fileControllers = require("../controllers/fileControllers");
fileRoute.get("/:id", fileControllers.get_file);
fileRoute.get("/:id/download", fileControllers.download_file);
module.exports = fileRoute;
