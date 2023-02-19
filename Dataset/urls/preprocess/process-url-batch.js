import urlBatch from "./url-batch-200.json" assert { type: "json" };
import fs from "fs";

const urlArray = urlBatch.map(urlItem => urlItem.url);
const urlGroup1 = urlArray.splice(0,50);
const urlGroup2 = urlArray.splice(0,50);
const urlGroup3 = urlArray.splice(0,50);
const urlGroup4 = urlArray.splice(0,50);

fs.writeFileSync("./batch-1[200]/url-group-1.json", JSON.stringify(urlGroup1));
fs.writeFileSync("./batch-1[200]/url-group-2.json", JSON.stringify(urlGroup2));
fs.writeFileSync("./batch-1[200]/url-group-3.json", JSON.stringify(urlGroup3));
fs.writeFileSync("./batch-1[200]/url-group-4.json", JSON.stringify(urlGroup4));

