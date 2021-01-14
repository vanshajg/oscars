import { ApolloServer } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { MovieResolver } from "./resolvers/movie";

export const schema = buildSchema({
  resolvers: [HelloResolver, MovieResolver],
  validate: false
})

export const gqlServer = (schema: GraphQLSchema) => new ApolloServer({ schema })
