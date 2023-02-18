import * as cheerio from 'cheerio';
import puppeteer from "puppeteer";
import fs from "fs";
import { clear } from 'console';

const selectors = {
  profileImg: ".ph5 > .display-flex > div img",
  fullName: ".ph5 > .mt2 h1",
  title: ".ph5 > .mt2 .text-body-medium",
  location: ".ph5 > .mt2 .pv-text-details__left-panel:last-child span.text-body-small",
  messageButton: ".ph5 .pvs-profile-actions a",
  education: {
      sectionTitle: "main#main section #education +div span",
      listItems: "main#main section #education +div + div ul.ph5 > li",
      title: "div.display-flex a > div span span:first-child",
      degree: "div.display-flex a > div+span>span:first-child",
      date: "div.display-flex a > div + span + span > span:first-child"
  }
}
const cookie = JSON.parse(fs.readFileSync("./cookie.json"));

const test = async (req, res) => {
  clear()
  const url = "https://www.linkedin.com/in/priya-saw-875476209/";

  const profiles = [];
  const profile = {};
  profile.url = url;
  const browser = await puppeteer.launch({headless: true,userDataDir: './my/path'});
  const page  = await browser.newPage();
  await page.setCookie(cookie);
  await page.setViewport({
    width: 1200,
    height: 1200
});
  await page.goto(url,{waitUntil: "load"});
  await page.waitForSelector(".ph5 > .display-flex > div img");
  const result = await page.$eval("body",el => el.innerHTML);
  // console.log(result);
  const $ = cheerio.load(result);
        const fullName = $(selectors.fullName).text();
        profile.fullName = fullName;
        console.log(fullName);
    
        const profileImg = $(selectors.profileImg).attr("src");
        profile.profileImg = profileImg;
        console.log(profileImg);
    
        const title = $(selectors.title).text().trim();
        profile.title = title;
        console.log(title);
    
        const location = $(selectors.location).text().trim();
        profile.location = location;
        console.log(location);

        const isConnected = $(selectors.messageButton).attr("href");
        profile.isConnected = Boolean(isConnected);

        profile.messageUrl = "https://www.linkedin.com" + isConnected;
    
        const educationSectionTitle = $(selectors.education.sectionTitle);
        console.log(educationSectionTitle.text());
    
        console.log()
        const educationList = $(selectors.education.listItems);
    
        profile.education = [];
        Array.from(educationList).forEach(li => {
            const educationItem = {}
            const title = $(li).find(selectors.education.title).text();
            educationItem.title = title;
            console.log(title);
            
            const degree = $(li).find(selectors.education.degree).text();
            educationItem.degree = degree;
            console.log(degree)
           
            const date = $(li).find(selectors.education.date).text();
            educationItem.date = date;
            console.log(date);
    
            profile.education.push(educationItem);
            console.log()
        });
  browser.close();

}

export default test;