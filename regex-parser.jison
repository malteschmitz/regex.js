
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[a-z]                 return 'CHAR'
"*"                   return '*'
"|"                   return '|'
"("                   return '('
")"                   return ')'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%start expressions

%% /* language grammar */

expressions
    : regex EOF
        { return $1; }
    ;

regex:
  regex "|" konkat
    {$$ = {kind: 'disjunction', lhs: $1, rhs: $3};}
  | konkat
  ;

konkat:
  konkat rep
    {$$ = {kind: 'concatenation', lhs: $1, rhs: $2};}
  | rep
  ;

rep:
  rep "*"
    {$$ = {kind: 'kleene', operand: $1};}
  | CHAR
    {$$ = {kind: 'char', content: yytext};}
  | "(" regex ")"
    {$$ = $2;}
  ;
