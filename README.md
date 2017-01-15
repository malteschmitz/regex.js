# regex.js

Automata based RegEx interpreter (educational!)

## Dependencies

Use npm!
```
npm install
```

## Test

```
npm test
```

## Compile

Compile Jison and TypeScript with
```
npm run compile
```

Watch TypeScript with
```
npm run watch
```

## Try

```
> node main.js "(a|bb)c" "bbc"
RegEx: (a|bb)c
Word: bbc
Match: true
```

```
> node regex.js "(ab|c*)e"
RegEx: (ab|(c)*)e
Word: ac

/Users/m/regex.js/regex2nfa.js:58
    throw "Not yet implemented";
    ^
Not yet implemented
```
