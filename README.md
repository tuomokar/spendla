# Spendla

A small app mainly for testing purposes using NestJS with GraphQL.

# To set up

You need a Postgresql server running on your machine. For the database name and other data required, see the [app module file](./src/app.module.ts)

Run `npm i` to install all the packages.

## Running the app

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
