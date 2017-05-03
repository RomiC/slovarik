import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import { query as userQuery } from './user';
import { query as wordQuery } from './word';
import { query as translationQuery } from './translation';

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query type',
  fields: {
    users: userQuery,
    words: wordQuery,
    traslations: translationQuery
  }
});

export default new GraphQLSchema({
  query: queryType
});