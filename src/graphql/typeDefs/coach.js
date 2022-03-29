import { gql } from 'apollo-server-express'

export default gql `
  extend type Query {
    getAllCoaches: [Coach!]!
    getCoachById(id: ID!): Coach!
    getAllCoachesPaginated(page: Int, limit: Int): CoachPaginated!
    # getAllMyCoachesPaginated(page: Int, limit: Int): CoachPaginated! @isAuth
  },

  extend type Mutation {
    createNewCoach(newCoach: CoachInput!): Coach! @isAuth
    editCoachById(id:ID!, updatedCoach: CoachInput!): Coach! @isAuth
    deleteCoachById(id: ID!): CoachNotification!
  }

  input CoachInput {
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    clubMember: Boolean!
    dbsNumber: String
    dbsDate: String
    SafeguardingDate: String
    roll: String!

  }

  type Coach {
    id: ID!
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    clubMember: Boolean!
    dbsNumber: String
    dbsDate: String
    SafeguardingDate: String
    roll: String!
  }

  type CoachPaginated {
    coach: [Coach!]!
    paginator: Paginator
  }

  type CoachNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`