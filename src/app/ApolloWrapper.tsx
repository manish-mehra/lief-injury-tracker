'use client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'


const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  })
  

export default function ApolloWrapper({children}: React.PropsWithChildren){

    return(
        <ApolloProvider client={client}>
          {children}
      </ApolloProvider>
    )
}