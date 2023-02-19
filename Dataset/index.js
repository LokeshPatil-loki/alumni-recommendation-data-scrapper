import ExtractProfileURLs from "./ExtractProfileURLs.js";
import ScrapeProfiles from "./ScrapeProfile.js";
import mongoose from "mongoose";
import fs from "fs";
import { storeURLs } from "./urls/storeURLs.js";
import { storeProfiles } from "./storeProfile.js";

const extractUrls = async (keyword) => {
  const profileUrls = await ExtractProfileURLs(keyword,true);
  console.log(profileUrls);
  fs.writeFileSync("./urls-19.json",JSON.stringify(profileUrls));
} 

const scrapeProfiles = async (urls) => {
  const profiles = await ScrapeProfiles(urls,false);
  console.log(JSON.stringify(profiles));
  fs.writeFileSync("./data.json",JSON.stringify(profiles))
} 

mongoose.connect("mongodb+srv://root:root@cluster0.xn1jwgu.mongodb.net/Alumni",async (err) => {
  if(err){
    console.log(err);
  }else{
    console.log("Connected ");
    await storeURLs();
    await storeProfiles();
    mongoose.disconnect();
    return;
  }
})




