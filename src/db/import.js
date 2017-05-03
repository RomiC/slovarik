import {
  default as db,
  user,
  word,
  translation
} from './index';
import {
  users,
  words,
  translations
} from './data';

export default () =>
  db.sync({ force: true })
    .then(() => Promise.all([
      ...users.map((u) => user.create({ login: u.login })),
      ...words.map((w) => word.create({ word: w.word })),
      ...translations.map((t) => translation.create({ translation: t.translation }))
    ]))
    .then(() => process.stdout.write('Everything done!'))
    .catch(({ message }) => process.stderr.write(message));