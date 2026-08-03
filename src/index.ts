import "dotenv/config";
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

            type Todo {
                id: ID!
                text: String!
                userId: ID!
                user: User
            }

            type Query {
                getName: String!
                getUsers: [User]
                getUser: User!

                getTodos: [Todo!]
                getTodo(id: ID!): Todo!
            }
        `,
        resolvers: {
            Todo: {
                user: (todo) => ({ name: "Avishek", phone: todo.userId, isAdmin: true }) // You can find this on DB with the -> todo.userId
            },
            Query: {
                getName: () => "Avishek Okay!!",
                getUsers: () => [{ name: "Avishek", phone: 989898, isAdmin: true }],
                getUser: () => ({ name: "Avishek", phone: 989898, isAdmin: true }),

                getTodos: () => [{ id: 1, text: "This is a todo", userId: 1 }],
                getTodo: (parent, { id }, context) => { // Find the todo in DB with "id"
                    console.log(context)
                    return { id, text: "This is a todo", userId: 1 }
                }
            },
            // Mutation: {

            // }
        },
    });

    app.use(express.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server, {
        context: async ({ req, res }) => {
            const token = req.headers["authorization"];

            if (token === "token1") {
                return { isAuth: true };
            }

            res.status(401).json({ message: "Wrong token" });
            return { isAuth: false };
        }
    }));

    app.listen(8000, () => console.log("Server running at 8000...."));
}

startGraphqlServer()
