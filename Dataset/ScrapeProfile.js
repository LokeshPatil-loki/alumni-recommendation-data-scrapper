import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import fs from "fs";
import {ProfileModel} from "./models/Profile.js"
import { profileExists } from "./models/ProfileExists.js";
const COLLEGE = "Bharati Vidyapeeth College of Engineering, Navi Mumbai";

const cookie = JSON.parse(fs.readFileSync("../cookie.json"));
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
    date: "div.display-flex a > div + span + span > span:first-child",
  },
  experinces: {
    setionTitle: "main#main section #experience +div span",
    listItems: "main#main section #experience +div + div ul.ph5 > li",
    title: "div.display-flex .display-flex .display-flex .display-flex span > span:first-child",
    organization: "div.display-flex+span span:first-child",
  },
  skill: {
    skillItem:
      "main#main section > div:last-child > div:nth-child(2) div:first-child div.scaffold-finite-scroll__content > ul:first-child li.pvs-list__paged-list-item",
    skillName: "div > .pvs-entity > div:last-child > div:first-child span > span:first-child",
  },
  certifications: {
    certificationsItems:
      "main#main section > div:last-child > div div.scaffold-finite-scroll__content > ul li.pvs-list__paged-list-item",
    certificationName:
      "div > .pvs-entity > div:last-child > div:first-child span.t-bold > span:first-child",
    certificationFrom: "div > .pvs-entity > div:last-child div + span span:first-child",
  },
};

const ScrapeProfiles = async (profileURL, headless = true) => {
  const profiles = [];

  const browser = await puppeteer.launch({ headless: headless, userDataDir: "./my/path" });
  const page = await browser.newPage();
  await page.setCookie(cookie);
  await page.setViewport({
    width: 1200,
    height: 1200,
  });
  for (let i = 0; i < profileURL.length; i++) {
    const profile = {};
    profile.isAlumni = false;
    profile.url = profileURL[i];
    profile.education = [];
    profile.skills = [];
    profile.experinces = [];
    profile.certifications = [];

    // await page.goto(profileURL[i],{waitUntil: 'domcontentloaded'});
    if(await profileExists(profileURL[i])){
      console.log("Already Exists: ", profileURL[i]);
      continue;
    }else{
      console.log("Scrapping:",profileURL[i]);
    }
    await page.goto(profileURL[i]);
    await page.waitForSelector(selectors.education.title);
    let reuslt = await page.evaluate(() => {
      return document.documentElement.innerHTML;
    });

    const $ = cheerio.load(reuslt);
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

    // EDUCATION SECTION
    try {
      const educationSectionTitle = $(selectors.education.sectionTitle);
      console.log(educationSectionTitle.text());

      console.log();
      const educationList = $(selectors.education.listItems);

      Array.from(educationList).forEach((li) => {
        const educationItem = {};
        const title = $(li).find(selectors.education.title).text();
        educationItem.title = title;
        console.log(title);

        const degree = $(li).find(selectors.education.degree).text();
        educationItem.degree = degree;
        console.log(degree);

        const date = $(li).find(selectors.education.date).text();
        educationItem.date = date;
        console.log(date);
        if (title === COLLEGE && date.split("-").length > 1) {
          const passingYear = getPassingYear(date);
          if (passingYear < 2024) {
            profile.isAlumni = true;
            console.log("Alumni: True");
          } else {
            console.log("Alumni: False");
          }
        }

        profile.education.push(educationItem);
        console.log();
      });
    } catch (error) {}

    if (profile.isAlumni) {
      // EXPERIENCES SECTION
      try {
        const experincesSectionTitle = $(selectors.experinces.setionTitle);
        console.log(experincesSectionTitle.text());

        const experincesList = $(selectors.experinces.listItems);
        // console.log(experincesList.text());
        Array.from(experincesList).forEach((li) => {
          const experinceItem = {};
          const org = $(li).find(selectors.experinces.organization).text();
          const title = $(li).find(selectors.experinces.title).text();
          // console.log("Title:",title);
          // console.log("Organiztion:",org);
          // console.log("==========================");
          experinceItem.organization = org;
          experinceItem.title = title;
          profile.experinces.push(experinceItem);
        });
        console.log(profile.experinces);
      } catch (error) {}

      // Skills Section
      try {
        await page.goto(profileURL[i] + "/details/skills/");
        await page.waitForSelector(selectors.skill.skillItem);
        reuslt = await page.evaluate(() => {
          return document.documentElement.innerHTML;
        });

        const $_skills = cheerio.load(reuslt);
        const skills_items = $_skills(selectors.skill.skillItem);
        console.log("Skills: ");
        Array.from(skills_items).forEach((item) => {
          const skill = $_skills(item).find(selectors.skill.skillName).text();
          profile.skills.push(skill);
        });
        console.log(profile.skills);
      } catch (error) {
      }
      // console.log(profile);

      try {
        // Certifications
        await page.goto(profileURL[i] + "/details/certifications/");
        await page.waitForSelector(selectors.certifications.certificationsItems);
        reuslt = await page.evaluate(() => {
          return document.documentElement.innerHTML;
        });

        const $_certification = cheerio.load(reuslt);
        console.log("Certifications: ");
        const certificationsItems = $_certification(selectors.certifications.certificationsItems);
        if (
          certificationsItems.text() !=
          "Nothing to see for now\n\nLicenses & certifications that Priya adds will appear here."
        ) {
          console.log(Array.from(certificationsItems).length);
          Array.from(certificationsItems).forEach((item) => {
            const title = $_certification(item)
              .find(selectors.certifications.certificationName)
              .text();
            const from = $_certification(item)
              .find(selectors.certifications.certificationFrom)
              .text();
            profile.certifications.push({ title, from });
          });
          console.log(profile.certifications);
        } else {
          console.log("No certificaiton");
        }
      } catch (error) {
      }
    }

    profiles.push(profile);
    try {
      if(await ProfileModel.create(profile)){
        console.log("Added to db");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(JSON.stringify(profile));
    console.log("--------------------------------------------------------------------\n");
  }
  await browser.close();
  console.log(profiles);
  return profiles;
};

const getPassingYear = (date) => {
  const splitDate = date.split("-");
  const passingDate = splitDate[1].trim().split(" ");
  const passingYear = parseInt(passingDate[passingDate.length - 1]);
  return passingYear;
};

// ScrapeProfile(profileURLS);
export default ScrapeProfiles;
