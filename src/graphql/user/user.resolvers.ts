import logger from "../../utils/logger";

interface User {
    username: string
    password: string
}

interface AddUser {
    id: string
    firstname: string
    lastname: string
    username: string
    role: string
}


export const userResolver = {
    Query: {
        users: () => [
            {id: 1, firstname: "ABC", lastname: "DEF", username: "test", role: "admin"}
        ],
        user: (_: any, {username}: any) => (
            {id: 1, firstname: "ABC", lastname: "DEF", username: "test", role: "admin"}
        ),
    },
    Mutation: {
        login: (
            _: any,
            {username, password}: User
        ) => {
            console.log(`Received username ${username} and password ${password}`)
            return {id: 1, firstName: "ABC", lastName: "DEF", userName: "test", role: "admin"}
        },
        registerUser: (
            _: any,
            userDetails: AddUser
        ) => {
            let strObject = JSON.stringify(userDetails)
            logger.info(`Received ${strObject} as new user`)
        }
    }
}
