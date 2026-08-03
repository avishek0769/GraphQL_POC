import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";


async function startGraphqlServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs: `#graphql
            
        `,
        resolvers: {
            Query: {
                
            },
            // Mutation: {

            // }
        },
    });

    app.use(express.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server running at 8000...."));
}

startGraphqlServer()
