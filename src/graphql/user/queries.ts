export const queries = `#graphql
    getUserToken(id: ID!): String!
    getCurrentUser(): User!

    getThreadsByUser(id: ID!): [Thread!]
    getCurrentUserThreads(): [Thread!]
`
