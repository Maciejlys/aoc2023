import { hash } from "../hasing";

export default function testing(input: string) {
  const lines = input.split(",");
  var boxes: string[][] = [];
  const labelBoxMap: Record<string, number> = {};

  for (let i = 0; i < 256; i++) {
    boxes[i] = [];
  }

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf("=") > 0) {
      const parts = lines[i].split("=");
      const label = parts[0];
      const boxIndex = hash(label);
      const focalLength = Number.parseInt(parts[1]);
      const tag = label + " " + focalLength;
      const box = boxes[boxIndex];
      const existingElementIndex = box.findIndex((l) => l.startsWith(label));
      if (existingElementIndex >= 0) {
        box[existingElementIndex] = tag;
      } else {
        box.push(tag);
      }
      labelBoxMap[label] = boxIndex;
    } else {
      const parts = lines[i].split("-");
      const label = parts[0];
      const boxIndex = hash(label);

      if (labelBoxMap.hasOwnProperty(label)) {
        boxes[boxIndex] = boxes[boxIndex].filter((str) => !str.startsWith(label));
      }
    }
  }

  var sum = 0;
  for (var i = 0; i < 256; i++) {
    var box = boxes[i];
    for (var j = 0; j < box.length; j++) {
      var focalLength = Number.parseInt(box[j].split(" ")[1]);
      var focusingPower = (1 + i) * (j + 1) * focalLength;
      sum += focusingPower;
    }
  }

  return sum;
}
