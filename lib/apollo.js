import { withApollo } from "next-apollo";
import ApolloClient, { HttpLink, InMemoryCache } from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache()
});

export default withApollo(apolloClient);
