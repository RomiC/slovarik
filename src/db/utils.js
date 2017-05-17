const DataLoader = require('dataloader');

const {
  word,
  translation
} = require('./index');

/**
 * Create list of requested fields fits to the model
 * @param {object} model Link to model
 * @param {array} requestedFields List of requested model fields
 * @return {array} List of requested fields fits to the model
 */
const modelFields = (model, requestedFields) => {
  const requestedFieldsMaps = requestedFields.reduce((res, field) => {
    res[field] = true;
    return res;
  }, {});

  return Object.keys(model.attributes)
    .filter((name) => {
      const field = model.attributes[name];
      return field.primaryKey === true ||
        typeof field.references === 'object' ||
        requestedFieldsMaps[name] === true;
    });
};

/**
 * DataLoader for the list of user words
 * @type {DataLoader}
 */
const getUserWords = new DataLoader((ids) => {
  const userIds = [];
  const wordFields = {};

  ids.forEach(([uid, fields]) => {
    userIds.push(uid);
    fields.reduce((res, f) => (res[f] = true, res), wordFields);
  });

  return word.findAll({
    attributes: Object.keys(wordFields),
    where: { userId: { $in: userIds } }
  })
    .then((words) =>
      ids.map(([uid]) =>
        words.filter((w) => w.userId === uid)
      )
    );
});

/**
 * DataLoader for the list of words translations
 * @type {DataLoader}
 */
const getWordTranslations = new DataLoader((ids) => {
  const wordIds = [];
  const translationFields = {};

  ids.forEach(([wid, fields]) => {
    wordIds.push(wid);
    fields.reduce((res, f) => (res[f] = true, res), translationFields);
  });

  return translation.findAll({
    attributes: Object.keys(translationFields),
    where: { wordId: { $in: wordIds } }
  })
    .then((translations) =>
      ids.map(([wid]) =>
        translations.filter((t) => t.wordId === wid)
      )
    );
});

module.exports = {
  modelFields,
  getUserWords,
  getWordTranslations
};
