import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {resolvers, typeDefs} from './graphql/schema';
import * as mongoose from "mongoose";
import logger from "./utils/logger";
import ensureCollections from "./models/init";
import dotenv from 'dotenv';
import {authMiddleware} from "./middleware/auth";
import bodyParser from "body-parser";

dotenv.config();
const port = process.env.MONGODB_PORT || 3000;
const username = process.env.MONGODB_USER_NAME || 3000;
const password = process.env.MONGODB_PASSWORD || 3000;

const app = express() as any;
app.use(bodyParser.json());
app.use(authMiddleware)

// TODO: Integrate username password. It's not working at the moment something at the infra level at the moment.
const mongoUri = `mongodb://localhost:${port}/blog`;

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start()
    server.applyMiddleware({app});
    app.listen({port: 4000}, () => {
        logger.info(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

mongoose.connect(mongoUri)
    .then(async () => {
        logger.info('Connected to MongoDB');
        await ensureCollections();
        startServer();
    })
    .catch(err => {
        logger.error('Error connecting to MongoDB', err);
    });
