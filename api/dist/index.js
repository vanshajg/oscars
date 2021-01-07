"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const type_graphql_1 = require("type-graphql");
const apollo_server_express_1 = require("apollo-server-express");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const constants_1 = require("./constants");
const hello_1 = require("./resolvers/hello");
const movie_1 = require("./resolvers/movie");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(express_session_1.default({
        name: constants_1.IDENTITY_COOKIE,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__IS_PROD__,
            domain: constants_1.__IS_PROD__ ? ".codeponder.com" : undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || "keyboard",
        resave: false,
    }));
    app.use(cookie_parser_1.default());
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, movie_1.MovieResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("server started at port 4000");
    });
});
main().catch((e) => {
    console.error(e);
});
//# sourceMappingURL=index.js.map