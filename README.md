# Spendla

A small app mainly for testing purposes using NestJS with GraphQL.

[NestJS documentation](https://nestjs.com/).

# To set up

You need a Postgresql server running on your machine.
For the database configurations for local development, you will need to create configuration file `ormconfig.env` in the root of this repository with the following content (replace the XXXXX with your own content):

```
TYPEORM_CONNECTION = postgres
TYPEORM_SYNCHRONIZE = false
TYPEORM_HOST = localhost
TYPEORM_ENTITIES = dist/**/*.model.js
TYPEORM_MIGRATIONS = dist/database/migrations/*.js
TYPEORM_MIGRATIONS_DIR = database/migrations
TYPEORM_USERNAME = XXXXX
TYPEORM_PASSWORD = XXXXX
TYPEORM_DATABASE = XXXXX
TYPEORM_PORT = XXXXX
```

Run `npm i` to install all the packages.

## Running the app

- `npm run migration:run`
  - Run the migrations
- `npm start`
  - Start the server locally. You'll find the GraphQL playground from localhost:3000/graphql
- `npm run start:dev`
  - Use watch mode.
- `npm run start:prod`
  - Use production mode.

## Testing

- `npm run test`
  - Run unit tests
- `npm run test:e2e`
  - Run the end to end test
- `npm run test:cov`
  - Test coverage

## Other

- `npm run migration:generate ExampleMigrationName`
  - Generate a new migration
