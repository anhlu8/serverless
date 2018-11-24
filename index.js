import { GraphQLServerLambda } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'

const lambda = new GraphQLServerLambda({
    typeDefs: __dirname + '/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
            secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
            debug: true, // log all GraphQL queries & mutations
        }),
    }),
})

export const server = lambda.graphqlHandler
export const playground = lambda.playgroundHandler