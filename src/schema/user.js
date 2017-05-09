const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { user } = require('../db');

const { schema: WordType } = require('./word');

const schema = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: {
    id: {
      type: GraphQLID,
      description: 'User ID',
      resolve: (u) => u.id
    },
    login: {
      type: GraphQLString,
      description: 'User login',
      resolve: (u) => u.login
    },
    words: {
      type: new GraphQLList(WordType),
      description: 'User\'s words',
      resolve: (u) => u.getWords()
    }
  }
});

const schemaDelete = new GraphQLObjectType({
  name: 'UserDelete',
  description: 'User delete type',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Deleted User ID'
    }
  }
});

const query = {
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
  resolve: (_, args) => user.findAll({ where: args })
};

const mutation = {
  addUser: {
    type: schema,
    description: 'Add user',
    args: {
      login: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'New user login'
      }
    },
    resolve: (_, args) => user.create(args)
  },
  deleteUser: {
    type: schemaDelete,
    description: 'Delete user',
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'User ID to delete'
      } 
    },
    resolve: (_, args) => user.destroy({ where: { id: args.userId } })
      .then(() => ({ id: args.userId }))
  }
};

module.exports = {
  schema,
  schemaDelete,
  query,
  mutation
};