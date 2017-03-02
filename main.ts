import 'source-map-support/register'

import { printer } from "./printer"
import { parser } from "./regex-parser";
import { regex2nfa } from "./regex2nfa";
import { Nfa } from "./nfa";
import * as process from "process";
import * as util from "util";

if(process.argv.length == 4) {
  var regex = process.argv[2];
  var word = process.argv[3];
  var debug = false;
} else if(process.argv.length == 5 && process.argv[2] === "--debug") {
  var regex = process.argv[3];
  var word = process.argv[4];
  var debug = true;
} else {
  throw "Usage: node main.js [--debug] <RegEx> <word>"
}

var re = parser.parse(regex);

console.log("RegEx: " + printer(re));
console.log("Word: " + word);

var nfa = regex2nfa(re);

if(debug) {
  console.log(util.inspect(nfa, {depth: undefined}));
}
console.log("Match: " + Nfa.exec(nfa, word));
