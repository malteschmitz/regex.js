import 'source-map-support/register'

import { printer } from "./printer"
import { parser } from "./regex-parser";

declare var process: any;
var input = process.argv[2];
if (!input) {
  throw "No argument given!"
}
var re = parser.parse(input);

console.log(re);

console.log(printer(re));
