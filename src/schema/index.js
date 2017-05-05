import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import {
  query as userQuery,
  mutation as userMutation
} from './user';
import {
  query as wordQuery,
  mutation as wordMutation
} from './word';
import {
  query as translationQuery,
  mutation as translationMutation
} from './translation';

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

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});