import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";


async function startGraphqlServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs: `#graphql
            type User {
                name: String!
                phone: Int
                isAdmin: Boolean!
            }

            type Query {
                getName: String!
                getUsers: [User]
                getUser: User!
            }
        `,
        resolvers: {
            Query: {
                getName: () => "Avishek Okay!!",
                getUsers: () => [{ name: "Avishek", phone: 989898, isAdmin: true }],
                getUser: () => ({ name: "Avishek", phone: 989898, isAdmin: true }),
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
