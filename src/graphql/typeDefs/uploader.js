import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    info: String!
  }

  extend type Mutation {
    uploader(file: Upload!): String!
  }
`