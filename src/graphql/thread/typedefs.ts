export const typedefs = `#graphql
    type Thread {
        id: ID!
        text: String!
        timestamp: Int
        userId: ID!
        user: User
    }
`;
