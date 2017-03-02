# regex.js [![Build Status](https://travis-ci.org/malteschmitz/regex.js.svg?branch=master)](https://travis-ci.org/malteschmitz/regex.js)

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
> node main.js "(ab|c*)e" "ac"
RegEx: (ab|(c)*)e
Word: ac
Match: false
```
