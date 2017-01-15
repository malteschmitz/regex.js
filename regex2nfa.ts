import {Nfa} from "./nfa";
import {State, Transitions} from "./nfa";
import {RegEx} from "./regex";

export function regex2nfa(regex: RegEx): Nfa {
  switch (regex.kind) {
    case "Char":
      var transitions: Transitions = new Map();
      Transitions.add(transitions, 0, regex.content, 1);
      return {
        states: [0,1],
        initials: [0],
        transitions: transitions,
        accepting: [1]
      }
    case "Concatenation":
      throw "Not yet implemented"
    case "Disjunction":
      throw "Not yet implemented"
    case "Kleene":
      throw "Not yet implemented"
  }
}
