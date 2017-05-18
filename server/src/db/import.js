const {
  default: db,
  user
} = require('./index');
const { users } = require('./data');

module.exports.default = () =>
  db.sync({ force: true })
    .then(() => Promise.all(users.map((u) =>
      user.create({ login: u.login })
        .then((usr) => Promise.all(u.words.map((w) =>
          usr.createWord({ word: w.word })
            .then((wrd) => Promise.all(w.translations.map((t) =>
              wrd.createTranslation({ translation: t.translation })
            )))
        )))
    )))
    .then(() => process.stdout.write('Everything done!'))
    .catch(({ message }) => process.stderr.write(message));
