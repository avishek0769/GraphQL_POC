import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.ts"
import { Thread } from "./thread/index.ts"

async function createGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typedefs}
            ${Thread.typedefs}

            type Query {
                ${User.queries}
                ${Thread.queries}
            }

            type Mutation { 
                ${User.mutations}
                ${Thread.mutations}
            }
        `,
        resolvers: {
            Query: { 
                ...User.resolvers.queries,
                ...Thread.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Thread.resolvers.mutations
            }
        },
    });

    await gqlServer.start();

    return gqlServer;
}

export default createGraphqlServer;
