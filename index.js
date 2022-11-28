const core = require("@actions/core");

const YEAR = core.getInput("year");
const LANGUAGE = core.getInput("language");
const REPO = core.getInput("repo");
const DIRECTORY = core.getInput("directory");
const OUTPUT = core.getInput("output");
const EXTENSION = core.getInput("extension");

const getFilename = (day, extensions) => {
  return `${day}.${extensions}`;
};

const getPath = (directory, filename) => {
  return `${directory}/${filename}`;
};

const repo = "Braweria/advent-of-code-2015-go";
const ext = "go";
const directory = "days";

const getFullPath = (repo, dir) => {
  return `https://api.github.com/repos/${repo}/contents/${dir}`;
};

const getFiles = async (path) => {
  const response = await fetch(path);
  const data = await response.json();
  return data;
};

console.log(getFiles(getFullPath(REPO, DIRECTORY)));
