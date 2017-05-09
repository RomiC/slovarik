const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql');

const {
  query: userQuery,
  mutation: userMutation
} = require('./user');
const {
  query: wordQuery,
  mutation: wordMutation
} = require('./word');
const {
  query: translationQuery,
  mutation: translationMutation
} = require('./translation');

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query type',
  fields: {
    users: userQuery,
    words: wordQuery,
    traslations: translationQuery
  }
});

const mutationType = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation type',
  fields: Object.assign({},
    userMutation,
    wordMutation,
    translationMutation
  )
});

module.exports.default = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});