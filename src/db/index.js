import Sequelize from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://xzrqyaie:nikytyoKQU60ek_j6xx1lXXXMCb_YIS9@horton.elephantsql.com:5432/xzrqyaie';

const db = new Sequelize(DATABASE_URL);

export const user = db.define('user', {
  login: Sequelize.STRING
});

export const word = db.define('word', {
  word: Sequelize.STRING
});

export const translation = db.define('translation', {
  translation: Sequelize.STRING
});

user.hasMany(word);
word.belongsTo(user);
word.hasMany(translation);
translation.belongsTo(word);

export default db;