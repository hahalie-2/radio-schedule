import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
    type Author {
        id: Int!
        firstName: String
        lastName: String
        posts: [Post]
    }
    type Post {
        id: Int!
        title: String
        author: Author
        votes: Int
    }

    type Query {
        posts: [Post]
        author(id: Int!): Author
    }
    type Mutation {
        upvotePost (
            postId: Int!
        ): Post
    }
`

export default makeExecutableSchema({
    teypDefs: schema,
    resolvers
})