
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[a-z]+                return 'CHAR'
"*"                   return '*'
"|"                   return '|'
"("                   return '('
")"                   return ')'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '|'
%right '*'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { return $1; }
    ;

e
    : e '|' e
        {$$ = {kind: 'or', lhs: $1, rhs: $3};}
    | e '*'
        {$$ = {kind: 'kleene', operand: $1};}
    | '(' e ')'
        {$$ = $2;}
    | CHAR
        {$$ = {kind: 'char', content: yytext};}
    ;
