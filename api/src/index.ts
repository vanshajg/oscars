import "reflect-metadata"
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from "connect-redis"
import { buildSchema } from 'type-graphql'
import { ApolloServer } from "apollo-server-express"
import cookieParser from 'cookie-parser';

import { IDENTITY_COOKIE, __IS_PROD__ } from "./constants";
import { HelloResolver } from "./resolvers/hello";
import { MovieResolver } from "./resolvers/movie";
import { setSession } from "./middleware/setSession";


const main = async () => {

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))

  app.use(
    session({
      name: IDENTITY_COOKIE,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __IS_PROD__, // cookie only works in https
        domain: __IS_PROD__ ? ".codeponder.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || "keyboard",
      resave: false,
    })
  );

  app.use(cookieParser())

  //  app.use(setSession)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, MovieResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started at port 4000");

  });
}

main().catch((e) => {
  console.error(e);
});