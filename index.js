import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './src/schema';
import importDb from './src/db/import';

const PORT = process.env.PORT || 3000;
const server = express();

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

server.get('/import', (req, res) => {
  Promise.resolve()
    .then(() => process.stdout.write(`Starting import to ${process.env.DATABASE_URL}\n`))
    .then(() => importDb())
    .then(() => (res.end(`Done!`), process.stdout.write(`Import complete succesfully!`)));
});

server.listen(PORT, () => process.stdout.write(`App is running on port ${PORT}`));
