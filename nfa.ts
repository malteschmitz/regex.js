export type State = number
export type Transitions = Map<State, Map<string, State[]>>

export interface Nfa {
  states: State[],
  initials: State[],
  transitions: Transitions,
  acceptings: State[]
}

export module Transitions {
  export function add(transitions: Transitions, from: State, input: string, ...to: State[]) {
    var edges = transitions.get(from);
    if (edges === undefined) {
      edges = new Map<string, State[]>();
      transitions.set(from, edges);
    }
    let edgesTo = edges.get(input);
    if(edgesTo === undefined) {
      edges.set(input, to);
    } else {
      edgesTo.push(...to);
    }
  }

  export function get(transitions: Transitions, from: State, input: string): State[] {
    var result = transitions.get(from);
    if (result) {
      return result.get(input) || [];
    }
    return [];
  }
}

export module Nfa {
  export function mapStates(nfa: Nfa, f: (s: State) => State) {
    var states = nfa.states.map(f);
    var initials = nfa.initials.map(f);
    var transitions: Transitions = new Map();
    for (let [from, map] of nfa.transitions) {
      for (let [input, tos] of map) {
        for (let to of tos) {
          Transitions.add(transitions, f(from), input, f(to));
        }
      }
    }
    var acceptings = nfa.acceptings.map(f);
    return {
      states: states,
      initials: initials,
      transitions: transitions,
      acceptings: acceptings
    }
  }

  export function exec(nfa: Nfa, input: string): boolean {
    var states = nfa.initials;
    var array = input.split('');
    array.forEach(c => {
      states = step(nfa, states, c);
    });
    return states.some(state => nfa.acceptings.indexOf(state) > -1);
  }

  function step(nfa: Nfa, states: State[], input: string): State[] {
    var result: State[] = [];
    for (var state of states) {
      var next = Transitions.get(nfa.transitions, state, input);
      if (next) {
        result.push(...next);
      }
    }
    return result;
  }
}
