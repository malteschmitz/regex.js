import 'source-map-support/register'

interface Disjunction {
  kind: "Disjunction",
  lhs: RegEx,
  rhs: RegEx
}

interface Concatenation {
  kind: "Concatenation",
  lhs: RegEx,
  rhs: RegEx
}

interface Char {
  kind: "Char",
  content: string
}

interface Kleene {
  kind: "Kleene",
  operand: RegEx
}

type RegEx = Disjunction | Concatenation | Char | Kleene

function printer(re: RegEx): string {
  switch(re.kind) {
    case "Disjunction": return "(" + printer(re.lhs) + "|" + printer(re.rhs) + ")";
    case "Concatenation": return printer(re.lhs) + printer(re.rhs);
    case "Char": return re.content;
    case "Kleene": return "(" + printer(re.operand) + ")*";
  }
}

import { parser as typed_parser } from "./regex-parser";
const parser = typed_parser as any;

declare var process: any;
var input = process.argv[2];
if (!input) {
  throw "No argument given!"
}
var re = parser.parse(input) as RegEx;

console.log(re);

console.log(printer(re));
