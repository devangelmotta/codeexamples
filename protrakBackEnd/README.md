# protrak-server

## Tech stack

- Serverless
- GraphQL
- Prisma & Nexus
- MySQL

## Setup

- Install Serverless globally: `npm install -g serverless`
- Install dependencies: `npm install`
- Create a `.env` file on this project's root:

  ```
  # General
  NODE_ENV=development
  PT_ENVIRONMENT=development

  # AWS
  ACCESS_KEY_ID=AKIAZK5OYZY5HSJQFS4N
  SECRET_ACCESS_KEY=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
  BUCKET_NAME=protrak-bucket

  # Auth0
  AUTH0_CLIENT_ID=0i40htZh6jcspxdQ9gyyDI4619QEUz07
  AUTH0_CLIENT_SECRET=8qbHR3TihuQr5zfhFCE1gZwJO5uVOvGIDxxEekUzoDdHdlDxauSYjhY4hzx3oFUt
  AUTH0_DATABASE_CONNECTION=Username-Password-Authentication
  AUTH0_DOMAIN=https://protrak-stage.auth0.com
  ```

- Create a `.env` file inside `prisma` folder:

  ```
  # Database
  # Example: mysql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
  DATABASE_URL=mysql://root:12345678@localhost:3306/protrak
  ```

* Generate the Database: `npm run run:migrations`
* Create a random user with many fake data (Optional): `npm run run:seeders`
* Run the app: `npm run dev`
* Execute GraphQL queries from `http://localhost:4000/graphql`
