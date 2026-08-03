export const queries = `#graphql
    getUserToken(id: ID!): String!
    getCurrentUser(): User!
    getUsers(): [User!]

    getThreadsByUser(id: ID!): [Thread!]
    getCurrentUserThreads(): [Thread!]
`
