import {UserPayload} from "./auth";
import {UserRole} from "../models/user";
import logger from "../utils/logger";

const permissions = {
    [UserRole.ADMIN]: [
        "registerUser",
        "deleteUser",
        "updateUser",
        "createBlog",
        "deleteBlog",
        "updateBlog",
    ],
    [UserRole.USER]: [
        "createBlog",
        "updateBlog"
    ],
};


// TODO: Implement decorator for this.
export function ValidateRequest(context: any, action: string) {
    const user = context.user as UserPayload;
    const role = user.role;
    logger.info(`Authenticating payload ${JSON.stringify(user)}`)
    if (!role){
        throw new Error("Role not available")
    }
    if (!permissions[role].includes(action)){
        throw new Error("Unauthorised action")
    }
}