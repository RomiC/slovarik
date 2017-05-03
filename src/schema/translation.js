import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} from 'graphql';

import { translation } from '../db';

export const schema = new GraphQLObjectType({
  name: 'Translation',
  description: 'Translation of the word',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Translation ID',
      resolve: (t) => t.id
    },
    translation: {
      type: GraphQLString,
      description: 'Translation value',
      resolve: (t) => t.translation
    }
  }
});

export const query = {
  type: new GraphQLList(schema),
  description: 'Search for word translation',
  args: {
    translation: {
      type: GraphQLString,
      description: 'Word translation'
    }
  },
  resolve: (_, args) => translation.findAll({ where: args })
};