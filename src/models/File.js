const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  filename: String,
  password: String,
  path: String,
  downloadedCount: { type: Number, default: 0 },
});
module.exports = mongoose.model("File", fileSchema);
