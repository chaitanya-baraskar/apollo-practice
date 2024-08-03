import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {resolvers, typeDefs} from './graphql/schema';

const app = express() as any;

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start()
    server.applyMiddleware({app});
    app.listen({port: 4000}, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
