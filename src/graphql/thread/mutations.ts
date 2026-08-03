export const mutations = `#graphql
    createThread(text: String!): Thread!
    editThread(text: String!, threadId: String!): Thread!
    deleteThread(threadId: String!): Boolean!
`
