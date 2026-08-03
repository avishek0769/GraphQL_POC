export const mutations = `#graphql
    createUser(name: String!, email: String!, password: String!): String!
    loginUser(email: String!, password: String!): User!
    changePassword(password: String!): Boolean!
`
