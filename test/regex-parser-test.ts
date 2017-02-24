import { suite, test } from "mocha-typescript";
import { expect } from 'chai'

import { parser } from '../regex-parser'

@suite class RegexParser {
    @test "parse Char"() {
        var input = "a";
        expect(parser.parse(input).kind).to.equal("Char");
    }
    @test "parse Concatenation"() {
        var input = "aa";
        expect(parser.parse(input).kind).to.equal("Concatenation");
    }
    @test "parse Disjunction"() {
        var input = "a|b";
        expect(parser.parse(input).kind).to.equal("Disjunction");
    }
    @test "parse Kleene"() {
        var input = "a*";
        expect(parser.parse(input).kind).to.equal("Kleene");
    }
}
