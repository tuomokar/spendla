# Spendla

A small app mainly for testing purposes using NestJS with GraphQL.

[NestJS documentation](https://nestjs.com/).

## To set up

### Database and its configuration

You need a Postgresql server running on your machine.
For the database configurations for local development, you will need to create configuration file `ormconfig.env` in the root of this repository with the following content (replace the XXXXX with your own content):

```
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_ENTITIES = dist/**/*.model.js
TYPEORM_MIGRATIONS = dist/database/migrations/*.js
TYPEORM_MIGRATIONS_DIR = database/migrations
TYPEORM_USERNAME = XXXXX
TYPEORM_PASSWORD = XXXXX
TYPEORM_DATABASE = XXXXX
TYPEORM_PORT = XXXXX
```

### Jwt secret

You need to have a file named `temp-jwt-token-secret.ts` in `src/auth` with content:

```
export const TEMP_JWT_TOKEN_SECRET = '<someJwtSecretKeyHere>';
```

Note that is temporary. Later on the jwt secret will be taken through some other means.

### Installing packages

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

- `npm test`
  - Run unit tests
- `npm run test:e2e`
  - Run the end to end test
- `npm run test:cov`
  - Test coverage

## Other

- `npm run migration:create ExampleMigrationName`
  - Create a new migration
- `npx typeorm-model-generator`
  - Generate models from the database. Note that you must add `@ObjectType` to the model class and `@Field` to its fields
