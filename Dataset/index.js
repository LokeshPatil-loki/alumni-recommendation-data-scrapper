import ExtractProfileURLs from "./ExtractProfileURLs.js";
import ScrapeProfiles from "./ScrapeProfile.js";
import mongoose from "mongoose";
import fs from "fs";
import urlGroup1 from "./urls/preprocess/batch-1[200]/url-group-3.json" assert { type: "json" };


const extractUrls = async (keyword) => {
  const profileUrls = await ExtractProfileURLs(keyword,true);
  console.log(profileUrls);
  fs.writeFileSync("./urls-19.json",JSON.stringify(profileUrls));
} 

const scrapeProfiles = async (urls) => {
  const profiles = await ScrapeProfiles(urls,true);
  console.log(JSON.stringify(profiles));
  fs.writeFileSync("./data.json",JSON.stringify(profiles))
} 

mongoose.connect("mongodb+srv://root:root@cluster0.xn1jwgu.mongodb.net/Alumni",async (err) => {
  if(err){
    console.log(err);
  }else{
    console.log("Connected ");
    await scrapeProfiles(urlGroup1);
    mongoose.disconnect();
    return;
  }
})




