import { URLModel } from "../models/URL.js";
import urls from "./url-set-final.json" assert { type: "json" };

export const storeURLs = async () => {
  for(let i=0;i<urls.length;i++){
    const urlDocument = await URLModel.create({url: urls[i], profileAdded: false});
    if(urlDocument){
      console.log("Added:",urls[i]);
    }else{
      console.log("Error while adding:", urls[i]);
    }
  }
} 
