export async function getStandaloneApolloClient() {
  const { ApolloClient, InMemoryCache, HttpLink } = await import(
    "@apollo/client"
  );
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://http://localhost:8000/graphql"
    }),
    cache: new InMemoryCache()
  });
}