import 'source-map-support/register'

import { suite, test } from "mocha-typescript";
import { expect } from 'chai'

import { regex2nfa } from '../regex2nfa'
import { Char } from '../regex'
import { Transitions } from '../nfa'

@suite class RegexConverter {
    @test "convert Char"() {
        var input: Char = {kind: "Char", content: "a"};
        var nfa = regex2nfa(input);
        expect(nfa.states.length).to.equal(2);
        expect(nfa.initials.length).to.equal(1);
        expect(nfa.accepting.length).to.equal(1);
        expect(Transitions.get(nfa.transitions, nfa.initials[0], "a")).to.equal(nfa.accepting[0]);
    }
}
