import urlBatch from "./url-batch-600-1000.json" assert { type: "json" };
import fs from "fs";

const urlArray = urlBatch.map(urlItem => urlItem.url);
const urlGroup1 = urlArray.splice(0,100);
const urlGroup2 = urlArray.splice(0,103);
// const urlGroup3 = urlArray.splice(0,50);

fs.writeFileSync("./batch-5[203]/url-group-1.json", JSON.stringify(urlGroup1));
fs.writeFileSync("./batch-5[203]/url-group-2.json", JSON.stringify(urlGroup2));
// fs.writeFileSync("./batch-4[400]/url-group-3.json", JSON.stringify(urlGroup3));
// fs.writeFileSync("./batch-4[400]/url-group-4.json", JSON.stringify(urlGroup4));


