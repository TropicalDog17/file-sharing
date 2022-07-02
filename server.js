const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("./src/models/File");
const fileRoute = require("./src/routes/file");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${rootDir}/public/data/temp`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  dest: `${rootDir}/public/data/temp`,
  storage: storage,
});

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://tropicaldog17:tropical@file-sharing-tropical.lzoqe.mongodb.net/?retryWrites=true&w=majority"
  )
  .catch((error) => console.log(error));
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/", (req, res) => {
  global.baseURL = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  res.render("index.ejs");
});
app.post("/upload", upload.single("filename"), (req, res) => {
  console.log(req.file);
  const file = new File({
    filename: req.file.originalname,
    password: req.body.password,
    path: req.file.path,
    id: req.file.filename,
  });
  file.save((err) => {
    if (err) return console.log(err);
  });
  console.log(file);
  console.log("Upload successfully");
  res.redirect(`/file/${file.id}`);
});
app.use("/file", fileRoute);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started. Listening at port 3000");
});
