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
  // https://api.github.com/repos/Braweria/advent-of-code-2015-go/contents/days
  return `https://api.github.com/repos/${repo}/content/${dir}`;
};

console.log(getFullPath(REPO, DIRECTORY));
