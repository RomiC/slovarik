const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString
} = require('graphql');

const {
  translation,
  modelFields
} = require('../db');

const schema = new GraphQLObjectType({
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

const schemaDelete = new GraphQLObjectType({
  name: 'TranslationDeleted',
  description: 'Translation deleted type',
  fields: {
    id: {
      type: GraphQLID,
      description: 'ID of deleted translation'
    }
  }
});

const query = {
  type: new GraphQLList(schema),
  description: 'Search for word translation',
  args: {
    translation: {
      type: GraphQLString,
      description: 'Word translation'
    }
  },
  resolve: (_, args, context, { fieldNodes }) => translation.findAll({
    attributes: modelFields(
      translation,
      fieldNodes[0].selectionSet.selections
        .filter(({ kind }) => kind === 'Field')
        .map(({ name }) => name.value)
    ),
    where: args
  })
};

const mutation = {
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
  deleteTranslation: {
    type: schemaDelete,
    description: 'Delete translation of the word',
    args: {
      translationId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Translation ID to delete'
      }
    },
    resolve: (_, args) => translation.destroy({ where: { id: args.translationId } })
      .then(() => ({ id: args.wordId }))
  }
};

module.exports = {
  schema,
  schemaDelete,
  query,
  mutation
};
