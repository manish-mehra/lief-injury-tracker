// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from 'graphql-yoga'

import { resolvers } from '../../../../graphql/resolvers'
import { typeDefs } from '../../../../graphql/schema' 

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  }),
 
  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',
 
  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
  context: prisma
})
 
export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }