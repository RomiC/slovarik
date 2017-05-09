const express = require('express');
const graphqlHTTP = require('express-graphql');

const { default: schema } = require('./src/schema');
const { default: importDb } = require('./src/db/import');

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
