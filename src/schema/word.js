const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql');

const { word } = require('../db');

const { schema: TranslationType } = require('./translation');

const schema = new GraphQLObjectType({
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

const schemaDelete = new GraphQLObjectType({
  name: 'WordDelete',
  fields: {
    id: {
      type: GraphQLID,
      description: 'ID od deleted word'
    }
  }
});

const query = {
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

const mutation = {
  addWord: {
    type: schema,
    description: 'Add new word to user vocabulary',
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'User ID'
      },
      word: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Word to add'
      },
      translations: {
        type: new GraphQLList(GraphQLString),
        description: 'Translations for the word'
      }
    },
    resolve: (_, args) => word.create({ word: args.word, userId: args.userId })
      .then((w) => {
        if (!!args.translations && args.translations.length > 0) {
          return Promise.all(args.translations.map((t) => w.createTranslation({ translation: t })))
            .then(() => w);
        } else {
          return w;
        }
      })
  },
  deleteWord: {
    type: schemaDelete,
    description: 'Delete word with all its translations',
    args: {
      wordId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID word to delete'
      }
    },
    resolve: (_, args) => word.destroy({ where: { id: args.wordId } })
      .then(() => ({ id: args.wordId }))
  }
};

module.exports = {
  schema,
  schemaDelete,
  query,
  mutation
};