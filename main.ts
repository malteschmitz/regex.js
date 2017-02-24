import 'source-map-support/register'

import { printer } from "./printer"
import { parser } from "./regex-parser";
import { regex2nfa } from "./regex2nfa";
import { Nfa } from "./nfa";
import * as process from "process";

var regex: string = process.argv[2];
var word: string = process.argv[3];
if (!regex || !word) {
  throw "Usage: node main.js <RegEx> <word>"
}

var re = parser.parse(regex);

console.log("RegEx: " + printer(re));
console.log("Word: " + word);

var nfa = regex2nfa(re);
console.log("Match: " + Nfa.exec(nfa, word));
