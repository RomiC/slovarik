import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
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