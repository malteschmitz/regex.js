
import { parser as typed_parser } from "./regex-parser";
const parser = typed_parser as any;

declare var process: any;
var input = process.argv[2];
if (!input) {
  throw "No argument given!"
}
var re = parser.parse(input);
console.log(re);
