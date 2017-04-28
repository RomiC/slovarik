import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import { query as userQuery } from './user';
// import wordType from './word';
// import translationType from './translation';

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query type',
  fields: {
    users: userQuery
  }
});

export default new GraphQLSchema({
  query: queryType
});