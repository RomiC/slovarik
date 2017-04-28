import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Word',
  description: 'Word in vocabulary',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Word ID'
    },
    word: {
      type: GraphQLString,
      description: 'Word value'
    }
  }
});