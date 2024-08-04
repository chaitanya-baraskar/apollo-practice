import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
    type User {
        """
        ID of the user.
        """
        _id: String
        
        """
        First name of the user
        """
        firstname: String,
        
        """
        Last name of the user.
        """
        lastname: String,
        
        """
        Username chosen by the user.
        """
        username: String
        
        """
        Role of the user.
        """
        role: String
        
        """
        List of blogs which belongs to the user.
        """
        blogs: [Blog!]!
    }
    
    """
    Authentication payload
    """
    type AuthPayload {
        """
        Token generated for making further GraphQL calls.
        """
        token: String!
        
        """
        User info
        """
        user: User!
    }
    
    """
    Login input for generating token
    """
    input LoginInput {
        username: String!
        password: String!
    }
    
     type Query {
        """
        List of the users.
        """
        users: [User]
        
        """
        Filter user by ID.
        """
        user(id: ID!): User
        
        """
        Get user by username.
        """
        userByUsername(username: String!): User
    }
    
    """
    Add new user in the system.
    """
    input AddUserInput{
        """
        First name of the user
        """
        firstname: String,
        
        """
        Last name of the user.
        """
        lastname: String,
        
        """
        Username chosen by the user.
        """
        username: String
        
        """
        Password chosen by the user.
        """
        password: String
        
        """
        Role of the user.
        """
        role: String
    }
    
     type Mutation {
        """
        Login user.
        """
        login(loginDetails: LoginInput!): AuthPayload!
        
        """
        Register new user.
        """
        registerUser(userDetails: AddUserInput): User
    }
    
`;
