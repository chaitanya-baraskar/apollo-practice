import express, {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../graphql/user/user.resolvers";
import logger from "../utils/logger";

const excludedOperations = ['registerUser', 'login', 'IntrospectionQuery'];
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-auth-token"] as string;
    const operationName = req.body.operationName

    if (!operationName){
        return next();
    }

    // Checking whether we need to skip checking token.
    if (excludedOperations.includes(operationName)) {
        return next();
    }

    if (!token) {
        res.status(401).json({message: "Authentication token in missing"})
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        logger.info(`Received payload ${payload}`)
        return next();
    } catch (err) {
        return res.status(401).json({message: 'Invalid or expired token'});
    }
}


export function getLoginUser(req: express.Request) {
  const token = req.headers["x-auth-token"] as string;
  if (token) {
    try {
      return jwt.verify(token, SECRET_KEY as string);
    } catch (error) {
      throw Error("Session Expired!!");
    }
  }
}