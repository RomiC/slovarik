import Sequelize from 'sequelize';

const db = new Sequelize('postgres://xzrqyaie:nikytyoKQU60ek_j6xx1lXXXMCb_YIS9@horton.elephantsql.com:5432/xzrqyaie');

export const user = db.define('user', {
  login: Sequelize.STRING
});

export const word = db.define('word', {
  word: Sequelize.STRING
});

export const translation = db.define('translation', {
  translation: Sequelize.STRING
});

export default db;