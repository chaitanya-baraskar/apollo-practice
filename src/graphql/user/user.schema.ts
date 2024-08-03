import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
    type User {
        id: String
        firstName: String,
        lastName: String,
        userName: String
        role: String
    }
    
    type Query {
        users: [User]
        user(id: ID!): User
    }
`;
