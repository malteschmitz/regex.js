export type State = number
export type Transitions = Map<State, Map<string, State>>

export interface Nfa {
  states: State[],
  initials: State[],
  transitions: Transitions,
  accepting: State[]
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
