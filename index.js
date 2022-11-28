const core = require("@actions/core");

const YEAR = core.getInput("year");
const LANGUAGE = core.getInput("language");
const REPO_HREF = core.getInput("repo_href");
const DIRECTORY = core.getInput("directory");
const OUTPUT = core.getInput("output");
const EXTENSION = core.getInput("extension");

console.log({ YEAR, LANGUAGE, REPO_HREF, REPO_HREF, OUTPUT, EXTENSION });
