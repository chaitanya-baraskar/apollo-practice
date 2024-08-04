import {gql} from "apollo-server-express";
import {userTypeDefs} from "./user/user.schema";
import { mergeResolvers } from '@graphql-tools/merge';
import {userResolver} from "./user/user.resolvers";
import {blogTypeDefs} from "./blog/blog.schema";
import {blogResolvers} from "./blog/blog.resolvers";


const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
    userTypeDefs,
    blogTypeDefs
]

export const resolvers = mergeResolvers([
    userResolver,
    blogResolvers
])
