import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} from 'graphql';

import { word } from '../db';

import { schema as TranslationType } from './translation';

export const schema = new GraphQLObjectType({
  name: 'Word',
  description: 'Word in vocabulary',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Word ID',
      resolve: (w) => w.id
    },
    word: {
      type: GraphQLString,
      description: 'Word value',
      resolve: (w) => w.word
    },
    translations: {
      type: new GraphQLList(TranslationType),
      description: 'Word\'s translations',
      resolve: (w) => w.getTranslations()
    }
  }
});

export const query = {
  type: new GraphQLList(schema),
  description: 'Search for the word',
  args: {
    word: {
      type: GraphQLString,
      description: 'Word to search'
    }
  },
  resolve: (_, args) => word.findAll({ where: args })
};