import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './src/schema';
import importDb from './src/db/import';

const PORT = process.env.PORT || 3000;
const server = express();


// const queryType = new GraphQLObjectType({
//   name: 'QueryType',
//   description: 'The root query type',
//   
// });

// const userInputType = new GraphQLInputObjectType({
//   name: 'UserInput',
//   description: 'UserInput type',
//   fields: {
//     login: {
//       type: GraphQLString,
//       description: 'User login'
//     }}
// });

// const mutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'The root mutation type',
//   fields: {
//     addUser: {
//       type: userType,
//       description: 'Add new user',
//       args: {
//         user: {
//           type: new GraphQLNonNull(userInputType)
//         }
//       },
//       resolve: (_, {user}) => {
//         const newUser = {
//           id: (parseInt(maxBy(users, (u) => parseInt(u.id)).id || 0) + 1),
//           login: user.login
//         };
//         users.push(newUser);
//         return newUser;
//       }
//     }
//   }
// });

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
