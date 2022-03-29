import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    authenticateUser(username: String!, password: String!): AuthResp!
    authUserProfile: User!
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResp!
  }

  input UserInput {
    roll: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    avatarImage: String
  }

  type User {
    id: ID!
    roll: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    avatarImage: String
  }

  type AuthResp {
    user: User!
    token: String!
  }
`