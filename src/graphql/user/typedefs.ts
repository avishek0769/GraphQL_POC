export const typedefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String
        password: String!
        salt: String
        refreshToken: String
        accessToken: String
        threads: [Thread]
    }
`;
