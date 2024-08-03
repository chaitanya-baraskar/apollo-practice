import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
    type User {
        """
        ID of the user.
        """
        id: String
        
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
    }
    
     type Query {
        """
        List of the users.
        """
        users: [User]
        
        """
        Filter user by ID.
        """
        user(username: String!): User
    }
    
    
    """
    Add new user in the system.
    """
    input AddUser{
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
    }
    
     type Mutation {
        """
        Login user.
        """
        login(username: String!, password: String!): User
        
        """
        Register new user.
        """
        registerUser(userDetails: AddUser): User
    }
    
`;
