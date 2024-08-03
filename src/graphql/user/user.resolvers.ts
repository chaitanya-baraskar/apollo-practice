import logger from "../../utils/logger";
import {User, UserRole} from "../../models/user";
import * as mongoose from "mongoose";

interface User {
    username: string
    password: string
}

interface AddUser {
    id: string
    firstname: string
    lastname: string
    username: string
    password: string
    role: UserRole
}


export const userResolver = {
    Query: {
        users: async () => {
            logger.info("Fetching all user information")
            return User.find();
        },
        user:async (_: any, id: string) => {
            logger.info(`Fetching user with ID ${id}`)
            return User.findById(new mongoose.Types.ObjectId(id))
        },
        userByUsername: async (_: any, { username }: { username: string })=> {
            logger.info(`Fetching user with username ${username}`)
            return User.findOne({username})
        }
    },
    Mutation: {
        login: (
            _: any,
            {username, password}: User
        ) => {
            console.log(`Received username ${username} and password ${password}`)
            return {id: 1, firstName: "ABC", lastName: "DEF", userName: "test", role: "admin"}
        },
        registerUser: async (
            _: any,
            input: any
        ) => {
            const {firstname, lastname, username, password, role} = input.input
            let newUser = new User({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                role: role
            });
            logger.info(`Creating new user with username ${username}`)
            // Save the new user and handle errors
            return newUser.save()
                .then(value => {
                    logger.info(`Saved record with ID ${value.id}`);
                    return value;
                })
                .catch(reason => {
                    logger.error(`Failed to save record with error ${reason}`);
                    throw new Error(`Failed to save record: ${reason.message}`);
                });
        }
    }
}
