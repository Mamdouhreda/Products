/* eslint-disable @next/next/no-img-element */
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
