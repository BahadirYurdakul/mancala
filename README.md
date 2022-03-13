This is a [Node.js](https://nodejs.org/en/) project writtent by BAHADIR YURDAKUL.

## Getting Started

If you are using different configurations please change .env file.

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:8080/healthcheck](http://localhost:8080/healthcheck) with your browser to see the result.

## API

Import Mancala.postman_collection.json to postman in order to check api.

## Conventions

Conventions used by application [https://google.github.io/styleguide/tsguide.html](https://google.github.io/styleguide/tsguide.html).

* Feature based foldering strategy.
* Lower camel case folder naming.
* Pascal case for classes and interfaces.
* Interfaces starts with I... (FE: IPlayer)
* Always use enum and not const enum and use CONSTANT_CASE.

## Tests

Move State machine test cases added to file /test/move/sowStoneStates/sowStateContainer.test.ts