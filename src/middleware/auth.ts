import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../graphql/user/user.resolvers";
import logger from "../utils/logger";
import {UserRole} from "../models/user";

const excludedOperations = ['registerUser', 'login', 'IntrospectionQuery'];
const authToken = "x-auth-token";

export interface UserPayload {
    id: string;
    role: UserRole;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers[authToken] as string;
    const operationName = req.body.operationName

    if (!operationName) {
        return next();
    }

    if (!token){
        throw new Error(`header ${authToken} not available`)
    }

    // Checking whether we need to skip checking token.
    if (excludedOperations.includes(operationName)) {
        return next();
    }

    if (!token) {
        res.status(401).json({message: "Authentication token in missing"})
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY) as { userId: string; role: UserRole };
        logger.info(`Received payload ${payload}`)
        req.user = {
            id: payload.userId,
            role: payload.role
        }
        return next();
    } catch (err) {
        return res.status(401).json({message: 'Invalid or expired token'});
    }
}
