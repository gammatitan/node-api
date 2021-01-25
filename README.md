# Ring Pro

## Local Setup

-   `$ npm i -g ts-node`
-   `$ npm i -g typeorm`

## Run

-   `$ npm start`

## Tests

-   `$ npm run test`

## Migrations

-   Generate a file using `$ npm run typeorm migration:generate -- -n <name of migration>`. This will create a migration in the `./src/migration` directory.
-   Run migrations using `$ npm run typeorm migration:run`

## Request Examples

-   POST: `http://localhost:8000/v1/auth/login`

## Bugs

-
