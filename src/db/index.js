import Sequelize from 'sequelize';

const db = new Sequelize('postgres://xzrqyaie:nikytyoKQU60ek_j6xx1lXXXMCb_YIS9@horton.elephantsql.com:5432/xzrqyaie');



console.log(db.getDialect());