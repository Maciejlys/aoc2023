import fs from "fs";

export const writeMatrixToFile = (arr: any[][], path: string) => {
  const file = fs.createWriteStream(`${__dirname}/${path}`);
  file.on("error", function (err) {
    console.log(err);
  });
  arr.forEach(function (v) {
    file.write(v.join(" ") + "\n");
  });
  file.end();
};
