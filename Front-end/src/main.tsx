import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
