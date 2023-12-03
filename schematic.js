const path = require("path");
const fs = require("fs");

const dirname = () => "`${__dirname}";
const fileRead = () => `fs.readFileSync(${dirname()}/input.txt\`, { encoding: "utf-8" })`;
const fileReadExample = () => `fs.readFileSync(${dirname()}/example.txt\`, { encoding: "utf-8" })`;

const generateTestForInput = () => `test.skip("should log the result", () => {
    const input = ${fileRead()};

    const result = testing(input);
    console.log(result);
  });`;

const generateTestForExampleInput = () => `test("should pass with example input", () => {
    const input = ${fileReadExample()};
    const output = 0;

    const result = testing(input);

    expect(result).toStrictEqual(output);
  });`;

function generateBoilerplateFiles(folderName) {
  const folderPath = path.join(__dirname, `src/${folderName}`);

  fs.mkdirSync(folderPath);

  const indexFileContent = `export default function testing(input) {
  // Your code here
}`;

  const testFilePath = path.join(folderPath, "index.test.ts");
  const testFileContent = `import { describe, expect, test } from "vitest";
import fs from "fs";
import testing from ".";
  
describe("${folderName}", () => {
  ${generateTestForExampleInput()}

  ${generateTestForInput()}
});
`;

  const indexFilePath = path.join(folderPath, "index.ts");
  const inputFilePath = path.join(folderPath, "input.txt");
  const inputExampleFilePath = path.join(folderPath, "example.txt");

  fs.writeFileSync(testFilePath, testFileContent, "utf8");
  fs.writeFileSync(indexFilePath, indexFileContent, "utf8");
  fs.writeFileSync(inputFilePath, "", "utf8");
  fs.writeFileSync(inputExampleFilePath, "", "utf8");
}

const generateFolders = (input) => {
  const [folderName] = input;
  const folderPath = path.join(__dirname, `src/${folderName}`);

  fs.mkdirSync(folderPath);

  generateBoilerplateFiles(folderName + "/1");
  generateBoilerplateFiles(folderName + "/2");
};

generateFolders(process.argv.slice(2));
