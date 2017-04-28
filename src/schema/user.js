import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import { filter } from 'lodash';
import { users } from '../db/data';

export const schema = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the user'
    },
    login: {
      type: GraphQLString,
      description: 'User login'
    }
  }
});

export const query = {
  type: new GraphQLList(schema),
  description: 'Search for the user',
  args: {
    id: {
      type: GraphQLID,
      description: 'User ID to search'
    },
    login: {
      type: GraphQLString,
      description: 'User Login to search'
    }
  },
  resolve: (_, args) => Promise.resolve(filter(users, args))
};