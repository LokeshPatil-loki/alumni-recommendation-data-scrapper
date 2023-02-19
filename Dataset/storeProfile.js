import data from "./data-166.json" assert { type: "json" };
import { ProfileModel } from "./models/Profile.js";
import { profileExists } from "./models/ProfileExists.js";
import { URLModel } from "./models/URL.js";
export const storeProfiles = async () => {
  for(let i=0;i<data.length;i++){
    if(await profileExists(data[i].url)){
      console.log("Already Exists: ", data[i].url );
    }else{
      const profileDocument = await ProfileModel.create(data[i]);
      if(profileDocument){
        const urlDocument = await URLModel.updateOne({url: data[i].url}, {profileAdded: true});
        if(urlDocument.matchedCount == 1){
          console.log("Added: ", data[i].url);
        }else{
          console.log("Error while Adding URL: ", data[i].url);
        }
      }else{
        console.log("Error while adding profile: ", data[i].url);
      }
    }
    console.log("------------------------------------------------");
  }
}