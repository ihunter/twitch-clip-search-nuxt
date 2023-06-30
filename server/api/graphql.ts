import { Resolvers } from '#graphql/resolver'
import resolvers from "../graphql/resolvers";
import { schema } from "#graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";

const resolversObj: Resolvers = {
  Query: {
    ...resolvers,
  },
};

const apollo = new ApolloServer({ typeDefs: schema, resolvers: resolversObj });

export default startServerAndCreateH3Handler(apollo);
