import { ApolloServer } from 'apollo-server';

interface Link {
    id?: string
    description: string
    url: string
}

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
},
{
    id: 'link-1',
    url: 'www.howtograph.com',
    description: 'Fullstack tutorial for GraphQL 2'
}]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.find(e => e.id == args.id)
    },
    Mutation: {
        post: (parent, args: Link) => {
            let idCount = links.length;

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        update: (parent, args: Link) => {
            let objIndex = links.findIndex(obj => obj.id == args.id)
            links[objIndex].url = args.url
            links[objIndex].description = args.description
            return links[objIndex]
        },
        delete: (parent, args) => {
            let objIndex = links.findIndex(obj => obj.id == args.id)
            links.splice(objIndex, 1)
            return links
        }
    }
}

import fs from 'fs';
import path from 'path';
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, '../src/schema.graphql'),
        'utf-8'
    ),
    resolvers
})

server
.listen()
.then(({ url }) =>
console.log(`Server is running on ${url}`)
);