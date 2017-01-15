import 'source-map-support/register'

import { suite, test } from "mocha-typescript";
import { expect } from 'chai'

import { regex2nfa } from '../regex2nfa'
import { Char, Concatenation, Disjunction } from '../regex'
import { Transitions } from '../nfa'

@suite class RegexConverter {
    @test "convert Char"() {
        var input: Char = {kind: "Char", content: "a"};
        var nfa = regex2nfa(input);
        expect(nfa.states.length).to.equal(2);
        expect(nfa.initials.length).to.equal(1);
        expect(nfa.acceptings.length).to.equal(1);
        expect(Transitions.get(nfa.transitions, nfa.initials[0], "a")).to.equal(nfa.acceptings[0]);
    }

    @test "convert Concatenation"() {
      var a: Char = {kind: "Char", content: "a"};
      var b: Char = {kind: "Char", content: "b"};
      var input: Concatenation = {kind: "Concatenation", lhs: a, rhs: b};
      var nfa = regex2nfa(input);
      expect(nfa.states.length).to.equal(4);
      expect(nfa.initials.length).to.equal(1);
      expect(nfa.acceptings.length).to.equal(1);
      var state = nfa.initials[0];
      var next = Transitions.get(nfa.transitions, state, "a")
      if (next) {
        state = next;
      }
      if (next = Transitions.get(nfa.transitions, state, "b")) {
        state = next;
      }
      expect(nfa.acceptings).to.include(state);
    }

    @test "convert Disjunction"() {
      var a: Char = {kind: "Char", content: "a"};
      var b: Char = {kind: "Char", content: "b"};
      var input: Disjunction = {kind: "Disjunction", lhs: a, rhs: b};
      var nfa = regex2nfa(input);
      expect(nfa.states.length).to.equal(4);
      expect(nfa.initials.length).to.equal(2);
      expect(nfa.acceptings.length).to.equal(2);
      // read a
      var next = Transitions.get(nfa.transitions, nfa.initials[0], "a");
      if (next) {
        expect(nfa.acceptings).to.include(next);
      } else {
        next = Transitions.get(nfa.transitions, nfa.initials[1], "a");
        expect(next).to.be.ok;
        next && expect(nfa.acceptings).to.include(next);
      }
      // read b
      next = Transitions.get(nfa.transitions, nfa.initials[0], "b");
      if (next) {
        expect(nfa.acceptings).to.include(next);
      } else {
        next = Transitions.get(nfa.transitions, nfa.initials[1], "b");
        expect(next).to.be.ok;
        next && expect(nfa.acceptings).to.include(next);
      }
    }
}
