// wait for fix for error importing schema
// import { schema } from "#graphql/schema";

import schema from "../graphql/schema";
import resolvers from "../graphql/resolvers";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";

const resolversObj = {
  Query: {
    ...resolvers,
  },
};

const apollo = new ApolloServer({ typeDefs: schema, resolvers: resolversObj });

export default startServerAndCreateH3Handler(apollo);
