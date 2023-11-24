# Advent of Code Data Action

## Fetching all Advent of Code solutions and constructing them into a JSON file

This Action grabs all your Advent of Code solutions and consolidates them into a JSON object for further use. It will sort them by _year_, then _language_ and then by _day_, with a link to your solution on GitHub. It will look somewhat like this:

```json
{
  "2015": {
    "JavaScript": {
      "1": {
        "url": "https://..."
      }
    }
  }
}
```

You can view a [production example here.](/aoc-data.json)

## Installation and usage instructions

Create a new workflow under `.github/workflows/aoc-data-generator.yml`. Here is a working example:

```yml
name: Generate Advent of Code Data
on: push

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
          # or npm or pnpm
      - run: |
          yarn install --frozen-lockfile
          yarn build
      - uses: wiktoriavh/aoc-widget-data-generator@v1
        with:
          year: 2015
          # the year the advent of code is from
          language: Go
          # the language you solved it in
          repo: wiktoriavh/advent-of-code-2015-go
          # needs to be owner/repo
          directory: days
          # the directory your solutions are in
          # they NEED to be numbered by day
          # day_01, day1, d01, 01 or 1 should all work
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: generating aoc data
          # you need to commit the new created file into your repository
```

## Fetching more than one year

You can also fetch several years of different repos or of the same repo. You then just need to repeat the same, but with updated data. You can view a [production example here.](.github/workflows/aoc-widget-data-generator.yml)

```yml
- uses: wiktoriavh/aoc-widget-data-generator@v1
  with:
    year: 2015
    language: Go
    repo: wiktoriavh/advent-of-code-2015-go
    directory: days
- uses: wiktoriavh/aoc-widget-data-generator@v1
  with:
    year: 2021
    language: TypeScript
    repo: wiktoriavh/Advent-of-Code
    directory: 2021/src
```

You can also choose the output directory of where to save the new file.

```yml
- uses: wiktoriavh/aoc-widget-data-generator@v1
  with:
    year: 2015
    language: Go
    repo: wiktoriavh/advent-of-code-2015-go
    directory: days
    output: assets
```
