import { RegEx } from "./regex"

export interface Parser {
    parse: (x: string) => RegEx
}
declare var parser: Parser
