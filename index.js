import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './src/schema';

const PORT = process.env.PORT || 3000;
const server = express();


// const queryType = new GraphQLObjectType({
//   name: 'QueryType',
//   description: 'The root query type',
//   fields: {
//     users: {
//       type: new GraphQLList(userType),
//       resolve: () => Promise.resolve(users)
//     },
//     user: {
//       type: userType,
//       args: {
//         id: {
//           type: new GraphQLNonNull(GraphQLID),
//           description: 'ID user to serach'
//         }
//       },
//       resolve: (_, {id}) => Promise.resolve(find(users, {id}))
//     },
//     words: {
//       type: new GraphQLList(wordType),
//       resolve: () => Promise.resolve(words)
//     },
//     word: {
//       type: wordType,
//       args: {
//         id: {
//           type: new GraphQLNonNull(GraphQLID),
//           description: 'Word ID to search'
//         }
//       },
//       resolve: (_, {id}) => Promise.resolve(find(words, {id}))
//     },
//     translations: {
//       type: new GraphQLList(translationType),
//       resolve: () => Promise.resolve(translations)
//     },
//     translation: {
//       type: translationType,
//       args: {
//         id: {
//           type: new GraphQLNonNull(GraphQLID),
//           description: 'Translation ID to search'
//         }
//       },
//       resolve: (_, {id}) => Promise.resolve(find(translations, {id}))
//     }
//   }
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

server.listen(PORT, () => console.log(`GraphQL server listening port ${PORT}`));
