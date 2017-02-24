import { suite, test } from "mocha-typescript";
import { expect } from 'chai';

import { parser } from '../regex-parser';
import { regex2nfa } from '../regex2nfa';
import { Nfa } from '../nfa';

@suite class IntegrationTests {
    @test "Simple char"() {
        let nfa = regex2nfa(parser.parse("a"));
        expect(Nfa.exec(nfa, "a")).to.true;
        expect(Nfa.exec(nfa, "b")).to.false;
        expect(Nfa.exec(nfa, "ba")).to.false;
        expect(Nfa.exec(nfa, "ab")).to.false;
        expect(Nfa.exec(nfa, "")).to.false;
    }

    @test "Multiple chars"() {
        let nfa = regex2nfa(parser.parse("abc"));
        expect(Nfa.exec(nfa, "abc")).to.true;
        expect(Nfa.exec(nfa, "ab")).to.false;
        expect(Nfa.exec(nfa, "bc")).to.false;
        expect(Nfa.exec(nfa, "ac")).to.false;
        expect(Nfa.exec(nfa, "")).to.false;
        expect(Nfa.exec(nfa, "abcd")).to.false;
        expect(Nfa.exec(nfa, "dabc")).to.false;
    }

    @test "Alternation"() {
        let nfa = regex2nfa(parser.parse("a|b"));
        expect(Nfa.exec(nfa, "a")).to.true;
        expect(Nfa.exec(nfa, "b")).to.true;
        expect(Nfa.exec(nfa, "c")).to.false;
        expect(Nfa.exec(nfa, "ba")).to.false;
        expect(Nfa.exec(nfa, "ab")).to.false;
        expect(Nfa.exec(nfa, "")).to.false;
    }

    @test "Alternation and concatentation"() {
        let nfa = regex2nfa(parser.parse("a(b|c)x"));
        expect(Nfa.exec(nfa, "abx")).to.true;
        expect(Nfa.exec(nfa, "acx")).to.true;
        expect(Nfa.exec(nfa, "aax")).to.false;
        expect(Nfa.exec(nfa, "ax")).to.false;
        expect(Nfa.exec(nfa, "ab")).to.false;
        expect(Nfa.exec(nfa, "bx")).to.false;
        expect(Nfa.exec(nfa, "")).to.false;
    }
}