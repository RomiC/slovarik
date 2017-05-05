import {
  GraphQLObjectType,
  GraphQLNonNull,
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

export const mutation = {
  addTranslation: {
    type: schema,
    description: 'Add new translation for the word',
    args: {
      wordId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Words ID to add the translation to'
      },
      translation: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Translation of the word'
      }
    },
    resolve: (_, args) => translation.create(args)
  },
};