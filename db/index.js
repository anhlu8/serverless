const {
    GraphQLServer
} = require('graphql-yoga');
const {
    Prisma
} = require('prisma-binding')
const path = require('path');

//The resolvers object is the actual implementation of the GraphQL schema. 
const resolvers = {
    Query: {
        info: () => 'testing',
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
            }, info)
        },
    },
}

const server = new GraphQLServer({
    typeDefs: path.join(__dirname, "../db/schema.graphql"),
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: path.join(__dirname, "generated/prisma.graphql"),
            endpoint: 'http://localhost:4466',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))