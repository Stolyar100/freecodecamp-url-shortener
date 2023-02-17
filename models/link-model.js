import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
});

const LinkModel = mongoose.model("Link", linkSchema);
export default LinkModel;
