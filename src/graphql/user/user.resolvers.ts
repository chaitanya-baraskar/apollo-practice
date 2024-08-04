import logger from "../../utils/logger";
import {User, UserRole} from "../../models/user";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Blog} from "../../models/blog";
import {ValidateRequest} from "../../middleware/rbac";

export const SECRET_KEY = process.env.JWT_SECRET_KEY || "TRUST_ME_THIS_IS_BACKUP";

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

interface LoginInput {
    username: string;
    password: string;
}

export const userResolver = {
    Query: {
        users: async () => {
            logger.debug("Fetching all user information")
            const users:any = await User.find();
            return users.map(async (user: any) => {
                const blogs = await Blog.find({"user": user._id});
                return {...user.toObject(), blogs};
            });
        },
        user: async (_: any, id: string) => {
            logger.debug(`Fetching user with ID ${id}`)
            const user = await User.findById(new mongoose.Types.ObjectId(id));
            if (user){
                const blogs = await Blog.find({"user": user._id});
                return { ...user.toObject(), blogs };
            }
            return null
        },
        userByUsername: async (_: any, {username}: { username: string }) => {
            logger.debug(`Fetching user with username ${username}`)
            return User.findOne({username})
        }
    },
    Mutation: {
        login: async (
            _: any,
            {loginDetails}: { loginDetails: LoginInput }
        ) => {
            const {username, password} = loginDetails;
            console.log(`Received username ${username} and password ${password}`)
            const user = await User.findOne({username});
            if (!user) {
                throw new Error("Invalid login credentials");
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error("Invalid login credentials");
            }

            const token = jwt.sign({userId: user._id, role: user.role}, SECRET_KEY, {
                expiresIn: "1h",
            });

            return {token, user};

        },
        registerUser: async (
            _: any,
            {userDetails}: { userDetails: AddUser },
            context: any
        ) => {
            ValidateRequest(context, "registerUser")
            const {firstname, lastname, username, password, role} = userDetails
            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = new User({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: hashedPassword,
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
