const Sequelize = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://xzrqyaie:nikytyoKQU60ek_j6xx1lXXXMCb_YIS9@horton.elephantsql.com:5432/xzrqyaie';

const db = new Sequelize(DATABASE_URL);

const user = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  login: Sequelize.STRING
}, {
  indexes: [
    {
      unique: true,
      fields: ['login']
    }
  ]
});

const word = db.define('word', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  word: Sequelize.STRING,
}, {
  indexes: [
    {
      fields: ['userId'],
      using: 'BTREE'
    }
  ]
});

const translation = db.define('translation', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  translation: Sequelize.STRING
}, {
  indexes: [
    {
      fields: ['wordId'],
      using: 'BTREE'
    }
  ]
});

user.hasMany(word, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});
word.belongsTo(user);
word.hasMany(translation, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});
translation.belongsTo(word);

module.exports = {
  default: db,
  user,
  word,
  translation
};
