type Decision = "A" | "R";
type Category = "x" | "m" | "s" | "a";
type Operator = "<" | ">";
type Operation = {
  rating?: Category;
  operator?: Operator;
  amount?: number;
  next: Decision | string;
};
type Workflows = Record<string, Operation[]>;
type Part = { x: number; m: number; a: number; s: number };

const parseInput = (input: string): [Workflows, Part[]] => {
  const [w, p] = input.split(/\n\n/);
  const workflows: Workflows = {};
  const parts: Part[] = [];

  p.split(/\n/).forEach((part) => {
    const trimmed = part.substring(1, part.length - 1).split(",");
    const temp: Part = {};
    trimmed.forEach((rating) => {
      const split = rating.split("=");
      temp[split[0]] = +split[1];
    });
    if (temp.x) {
      parts.push(temp);
    }
  });

  w.split(/\n/).forEach((workflow) => {
    const parsed = workflow.replace("}", "").split("{");
    const operations: Operation[] = [];
    parsed[1].split(",").forEach((entry) => {
      if (entry.includes(":")) {
        const split = entry.split(":");
        const op = split[0];
        const next = split[1];
        operations.push({
          rating: op[0] as Category,
          operator: op[1] as Operator,
          amount: +op.substring(2, op.length),
          next,
        });
      } else {
        operations.push({
          next: entry,
        });
      }
    });
    workflows[parsed[0]] = operations;
  });

  return [workflows, parts];
};

const compare = (a: number, b: number, operator: Operator) => {
  // TODO remove

  if (operator === ">") return a > b;
  else return a < b;
};

const filterAccepted = (workflows: Workflows, part: Part): boolean => {
  const queue = ["in"];

  while (queue.length) {
    const workflowKey = queue.shift()!;
    const currentWorkflow = workflows[workflowKey];

    for (let index = 0; index < currentWorkflow.length; index++) {
      const currentStep = currentWorkflow[index];

      if (currentStep.rating) {
        if (
          compare(
            part[currentStep.rating],
            currentStep.amount!,
            currentStep.operator!,
          )
        ) {
          if (currentStep.next === "A") return true;
          else if (currentStep.next === "R") return false;
          else {
            queue.push(currentStep.next);
          }
          break;
        } else {
          continue;
        }
      } else {
        if (currentStep.next === "A") return true;
        else if (currentStep.next === "R") return false;
        else {
          queue.push(currentStep.next);
        }
      }
    }
  }
  return false;
};

const sumPartRatings = (part: Part): number => {
  return part.x + part.a + part.s + part.m;
};

export default function testing(input: string) {
  const [workflows, parts] = parseInput(input);
  const acceptedParts = parts.filter((part) => filterAccepted(workflows, part));
  return acceptedParts.reduce((acc, curr) => acc + sumPartRatings(curr), 0);
}
