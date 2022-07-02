const File = require("../models/File");
const express = require("express");
exports.get_file = async (req, res) => {
  const file = await File.findById(req.params.id).exec();
  let data = {
    url: `localhost:3000/file/${file.id}`,
    filename: `${file.filename}`,
    id: `${file.id}`,
  };
  console.log(data);
  res.render("download.ejs", { data: data });
};
exports.download_file = async (req, res) => {
  let id = req.params.id;
  const file = await File.findById(id).exec();
  const password = file.password;
  if (req.query.password !== password) {
    return res.render("download-error.ejs", {
      data: {
        url: `http://file-sharing-tropicaldog.herokuapp.com/file/${file.id}`,
      },
    });
  }
  const path = file.path;
  res.download(path);
};
