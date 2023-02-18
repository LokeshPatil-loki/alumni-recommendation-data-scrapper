import ExtractProfileURLs from "./ExtractProfileURLs.js";
import ScrapeProfiles from "./ScrapeProfile.js";
import fs from "fs";
import { profile } from "console";

// const keyword = "";
// const profileUrls = await ExtractProfileURLs(keyword,true);
// console.log(profileUrls);
// fs.writeFileSync("./Dataset/urls.json",JSON.stringify(profileUrls))

// const profileUrls = [
//   'https://www.linkedin.com/in/akanksha-joshi-b715ba1ba',
//   "https://www.linkedin.com/in/priya-saw-875476209/",
//   'https://www.linkedin.com/in/siddhi-chavan-99085b18a',
// ]

// const profileUrls = [
//   "https://www.linkedin.com/in/priya-saw-875476209/",
// ]

const profiles = await ScrapeProfiles([
"https://www.linkedin.com/in/anshu-kumar-jha-3b26111a4",
],false);
console.log(JSON.stringify(profiles));
fs.writeFileSync("./data.json",JSON.stringify(profiles))

