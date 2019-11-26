// data/schema.js

import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server-express";
import resolvers from "./resolvers";

// Define our schema using the GraphQL schema language
const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
  }

  type Tokens {
    jwtToken: String
    refreshToken: String
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): ID
    login(email: String!, password: String!): Tokens
    refreshToken(refreshToken: String!): String
  }
`;
export default makeExecutableSchema({ typeDefs, resolvers });
