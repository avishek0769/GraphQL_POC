import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.ts"

async function createGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typedefs}
            ${User.queries}
            ${User.mutations}
        `,
        resolvers: {
            Query: { 
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        },
    });

    await gqlServer.start();

    return gqlServer;
}

export default createGraphqlServer;
