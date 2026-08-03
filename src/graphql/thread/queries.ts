export const queries = `#graphql
    getThreadsByUser(id: ID!): [Thread!]
    getCurrentUserThreads(): [Thread!]
`
