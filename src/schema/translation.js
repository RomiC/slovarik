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
      description: 'Translation ID'
    },
    translation: {
      type: GraphQLString,
      description: 'Translation value'
    }
  }
});