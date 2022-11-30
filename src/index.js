import * as core from "@actions/core";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const YEAR = core.getInput("year");
const LANGUAGE = core.getInput("language");
const REPO = core.getInput("repo");
const DIRECTORY = core.getInput("directory");
const OUTPUT = core.getInput("output");

const createGithubApiPath = (repo, dir) => {
  return `https://api.github.com/repos/${repo}/contents/${dir}`;
};

const getData = async (path) => {
  const response = await fetch(path);
  return response.json();
};

const reduceInformation = (files) => {
  return files.map((file) => ({ name: file.name, url: file.html_url }));
};

const convertToNumber = (filenbaseame) => {
  const filename = path.parse(filenbaseame).name;
  const day = /\d+/gi.exec(filename);
  return Number(day);
};

const createStructure = (files) => {
  return files.reduce((accumulated, current) => {
    const dayNumber = convertToNumber(current.name);

    if (dayNumber === 0) {
      return accumulated;
    }

    const reduced = {
      ...accumulated,
      [dayNumber]: current.url,
    };

    return reduced;
  }, {});
};

const appendToExisting = (structure) => {
  let existingFile = "{}";

  try {
    existingFile = fs.readFileSync(OUTPUT + "/aoc-data.json", "utf8");
  } catch (error) {
    console.log("No such file was found");
  }
  const existingStructure = JSON.parse(existingFile);
  return {
    ...existingStructure,
    [YEAR]: {
      ...existingStructure[YEAR],
      [LANGUAGE]: structure,
    },
  };
};

function saveToFile(data) {
  fs.writeFile(
    OUTPUT + "/aoc-data.json",
    JSON.stringify(data, null, 4),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("New file was saved successfully");
    }
  );
}

const init = async () => {
  saveToFile(
    appendToExisting(
      createStructure(
        reduceInformation(await getData(createGithubApiPath(REPO, DIRECTORY)))
      )
    )
  );
};

init();
