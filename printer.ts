import { RegEx } from './regex'

export function printer(re: RegEx): string {
  switch(re.kind) {
    case "Disjunction": return "(" + printer(re.lhs) + "|" + printer(re.rhs) + ")";
    case "Concatenation": return printer(re.lhs) + printer(re.rhs);
    case "Char": return re.content;
    case "Kleene": return "(" + printer(re.operand) + ")*";
  }
}
