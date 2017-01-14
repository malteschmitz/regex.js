import 'source-map-support/register'

interface Disjunction {
  kind: "disjunction",
  lhs: RegEx,
  rhs: RegEx
}

interface Concatenation {
  kind: "concatenation",
  lhs: RegEx,
  rhs: RegEx
}

interface Char {
  kind: "char",
  content: String
}

interface Kleene {
  kind: "kleene",
  operand: RegEx
}

type RegEx = Disjunction | Concatenation | Char | Kleene

import { parser as typed_parser } from "./regex-parser";
const parser = typed_parser as any;

declare var process: any;
var input = process.argv[2];
if (!input) {
  throw "No argument given!"
}
var re = parser.parse(input) as RegEx;

switch(re.kind) {
  case "char": console.log(re.content);
}

console.log(re);
