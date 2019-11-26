# node-security
A graphql express server implemented after the loader architecture. It is written completly in ES6 except for some config files needed by the sequelize-cli. It supports 3 mutations around security features such as: Login, Sign-Up, Refresh Auth Token and also getting the currently logged in user from a jwt token. This represents the backend part of the following repo:
https://github.com/Cosmin26/node-security-react

## Prerequisites before running this project:
1. Node.js 10 (to run the server in development mode)
2. Sequelize-cli installed globally if you would like to run sequelize commands that were not defined in the scripts.
3. Docker (to run the containers)
4. Postgres if you don't want to run with docker

## Usage:
In the docker-compose.yml expose your desired db properties to let docker create your postgres db. After that run ```docker-compose up```
In the .env file introduce your own variables for the database alongside other variables you would like. After modifying the .env file run these 2 commands:
```
docker build --network="node-security_app-network" -t=node-security .
docker run --network="node-security_app-network" -p 8080:8080 node-security
```

Then navigate to http://localhost:8080/graphql you will be able to interact with the console in order to use mutations and queries.

The app runs in a network defined in the docker compose file in order for the docker containers to be able to comunicate easily.

## Available operations for the graphql express server

```graphql
mutation {
  signup(name: "cpruteanu", email:"node@security.com, password:"123456")
}

mutation {
  login(email:"node@security.com, password:"123456") {jwtToken, refreshToken}
}

mutation {
  refreshToken(refreshToken:"jwtTokenReceivedFromLogin")
}

query {
  me {
    id
    name
    email
  }
}
```

## Development Usage
You need to make sure that the db_host and post is the ones that are mapped to your own machine. It works with localhost or 0.0.0.0.

There are multiple configs to run the app for development. 

The main one is ```npm start``` which starts the app with nodemon in order to have reload files on the fly.

Another one that is useful is ```npm run debug``` which resembles the npm start except that it enables us to debug de server using a launch configuration attached to the project for vscode.

The last one of interest is ```npm run start:prop``` which is used for the dockerfile and it's without nodemon.

## Logging
The Server uses an instance of winston to log various methods.

## Database migration
This Server makes use of sequelize migration files in order to track different states of the database.

## Architecture
The server makes use of the loader pattern to break chunks of configuration of the app into smaller ones. Also there's a separation between middlewares, data access objects and bussines related objects such as services.
