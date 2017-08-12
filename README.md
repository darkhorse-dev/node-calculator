# Node calculator

## Usage: 
### Via command line:

```sh
node index.js <n1> <n2> <op>
node index.js --num1=<n1> --num2=<n2> --operation=<op>
```

### Via http:
1. Start server

```sh
node server.js
```
2. List supported methods:

- GET http://localhost:3000/calculator/actions

3. Invoke any method:

- POST http://localhost:3000/calculator/actions/[add|subtract|multiply|divide|pow] { num1: <n1>, num2: <n2> }


## Testing examples:
tdd-examples
```sh
mocha ./test/tdd-examples --ui tdd
```
bdd-examples
```sh
mocha ./test/bdd-examples
```
mocha-examples
```sh
mocha ./test/mocha-examples
```
http-examples
```sh
node server.js
mocha ./test/http-examples
```
