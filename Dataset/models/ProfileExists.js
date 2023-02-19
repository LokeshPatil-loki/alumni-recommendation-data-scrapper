import { ProfileModel } from "./Profile.js";

export const profileExists = async (url) => {
  const profiles = await ProfileModel.find({ url });
  return profiles.length > 0;
};
