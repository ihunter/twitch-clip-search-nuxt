// wait for fix for error importing schema
// import { schema } from "#graphql/schema";
import schema from "../testSchema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";

const resolvers = {
  Query: {
    books: (_, { id }) => {
      return [
        {
          id: 1,
          title: "GraphQL with Nuxt",
        },
        {
          id: 2,
          title: "The Three Body Problem",
        },
        {
          id: 3,
          title: "A Random Walk Down Wall Street",
        },
      ].filter((book) => book.id === id);
    },
  },
};

const apollo = new ApolloServer({ typeDefs: schema, resolvers });

export default startServerAndCreateH3Handler(apollo);
