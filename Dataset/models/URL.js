import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    require: true,
  },
  profileAdded: {
    type: Boolean,
    require: true
  }
});
const URLModel = mongoose.model("URL",URLSchema);
export {URLModel};