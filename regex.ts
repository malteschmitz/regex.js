export interface Disjunction {
  kind: "Disjunction",
  lhs: RegEx,
  rhs: RegEx
}

export interface Concatenation {
  kind: "Concatenation",
  lhs: RegEx,
  rhs: RegEx
}

export interface Char {
  kind: "Char",
  content: string
}

export interface Kleene {
  kind: "Kleene",
  operand: RegEx
}

export type RegEx = Disjunction | Concatenation | Char | Kleene
