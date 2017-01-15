export type State = number
export type Transitions = Map<State, Map<string, State>>

export interface Nfa {
  states: State[],
  initials: State[],
  transitions: Transitions,
  acceptings: State[]
}

export module Transitions {
  export function add(transitions: Transitions, from: State, input: string, to: State) {
    var map = transitions.get(from);
    if (!map) {
      var newMap = new Map<string, State>();
      transitions.set(from, newMap);
      map = newMap;
    }
    map.set(input, to);
  }

  export function get(transitions: Transitions, from: State, input: string): State | undefined {
    var result = transitions.get(from);
    if (result) {
      return result.get(input);
    }
    return undefined;
  }
}

export module Nfa {
  export function mapStates(nfa: Nfa, f: (s: State) => State) {
    var states = nfa.states.map(f);
    var initials = nfa.initials.map(f);
    var transitions: Transitions = new Map();
    for (var [from, map] of nfa.transitions) {
      for (var [input, to] of map) {
        Transitions.add(transitions, f(from), input, f(to));
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
        result.push(next);
      }
    }
    return result;
  }
}
