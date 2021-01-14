import express from 'express'
import nextApp from 'client'
import { schema, gqlServer } from 'api/src/index'

async function main() {
  const app = express();

  await bootstrapGqlServer(app);
  await bootstrapClientApp(app);

  app.listen(process.env.PORT, () => {
    console.log(`[ server ] ready on port ${process.env.PORT}`);
  });
}

async function bootstrapClientApp(expressApp: any) {
  await nextApp.prepare();
  expressApp.get('*', nextApp.getRequestHandler());
}

async function bootstrapGqlServer(expressApp: any) {
  const apolloschema = await schema
  gqlServer(apolloschema).applyMiddleware({ app: expressApp })
}

main();
