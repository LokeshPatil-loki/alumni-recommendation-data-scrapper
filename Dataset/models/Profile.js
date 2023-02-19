import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  isAlumni: {
    type: Boolean
  },
  isConnected: {
    type: Boolean
  },
  url: {
    type: String,
    unique: true
  },
  fullName: {
    type: String
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  messageUrl: {
    type: String
  },
  education: [],
  skills: [],
  experinces: [],
  certifications: [],
});
const ProfileModel = mongoose.model("Profile",ProfileSchema);
export {ProfileModel};