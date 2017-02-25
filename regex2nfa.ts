import {Nfa} from "./nfa";
import {State, Transitions} from "./nfa";
import {RegEx,Char,Concatenation,Disjunction,Kleene} from "./regex";

function char2nfa(char: Char): Nfa {
  var transitions: Transitions = new Map();
  Transitions.add(transitions, 0, char.content, 1);
  return {
    states: [0,1],
    initials: [0],
    transitions: transitions,
    acceptings: [1]
  }
}

function concatenation2nfa(concatenation: Concatenation): Nfa {
  var left = regex2nfa(concatenation.lhs);
  var right = regex2nfa(concatenation.rhs);
  // make state sets disjoint
  var offset = Math.max(...left.states) + 1;
  right = Nfa.mapStates(right, q => q + offset);

  var transitions = right.transitions;
  for (let [from, map] of left.transitions) {
    for (let [input, tos] of map) {
      for (let to of tos) {
        Transitions.add(transitions, from, input, to);
        if (left.acceptings.indexOf(to) > -1) {
          right.initials.forEach(initial => {
            Transitions.add(transitions, from, input, initial);
          });
        }
      }
    }
  }

  return {
    states: left.states.concat(right.states),
    initials: left.initials,
    transitions: transitions,
    acceptings: right.acceptings
  }
}

function disjunction2nfa(disjunction: Disjunction): Nfa {
  var one = regex2nfa(disjunction.lhs);
  var two = regex2nfa(disjunction.rhs);

  // make state sets disjoint
  var offset = Math.max(...one.states) + 1;
  two = Nfa.mapStates(two, q => q + offset);

  var transitions = two.transitions;
  for (var [from, map] of one.transitions) {
    for (var [input, tos] of map) {
      Transitions.add(transitions, from, input, ...tos);
    }
  }

  return {
    states: one.states.concat(two.states),
    initials: one.initials.concat(two.initials),
    transitions: transitions,
    acceptings: one.acceptings.concat(two.acceptings)
  }
}

function kleene2nfa(kleene: Kleene): Nfa {
  let operandNfa = regex2nfa(kleene.operand);
  let transitions = operandNfa.transitions;
  for(let [from, outgoingEdges] of transitions) {
    for(let [input, tos] of outgoingEdges) {
      for(let to of tos) {
        if(operandNfa.acceptings.indexOf(to) >= 0) {
          for(let initial of operandNfa.initials) {
            Transitions.add(transitions, from, input, initial);
          }
        }
      }
    }
  }
  return {
    states: operandNfa.states,
    initials: operandNfa.initials,
    transitions: transitions,
    acceptings: operandNfa.acceptings.concat(operandNfa.initials)
  };
}

export function regex2nfa(regex: RegEx): Nfa {
  switch (regex.kind) {
    case "Char":
      return char2nfa(regex);
    case "Concatenation":
      return concatenation2nfa(regex);
    case "Disjunction":
      return disjunction2nfa(regex);
    case "Kleene":
      return kleene2nfa(regex);
  }
}
