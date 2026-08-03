export const typedefs = `#graphql
    type Thread {
        id: ID!
        text: String!
        timestamp: String
        userId: ID!
        user: User
    }
`;
