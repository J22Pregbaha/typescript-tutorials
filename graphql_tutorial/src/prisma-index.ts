import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

interface Link {
    id?: string
    description: string
    url: string
}

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        }
    },
    Mutation: {
        post: (parent, args: Link, context, info) => {
            return context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description
                }
            })
        }
    }
}

// 3
import fs from 'fs'
import path from 'path'
const prisma = new PrismaClient()
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, '../src/schema.graphql'),
        'utf-8'
        ),
        resolvers,
        context: {
            prisma
        }
    })
    
    server
    .listen()
    .then(({ url }) =>
    console.log(`Server is running on ${url}`)
    );