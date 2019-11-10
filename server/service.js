var firebaseDb = require('./firebase');

const addResult = async (result = {}) => {
  return await firebaseDb.db.ref('results').push().set(result, (err) => new Promise((resolve, reject) => err ? reject(err) : resolve(result)));
}

const getResults = async (params) => {
  return new Promise((resolve, reject) => {
    firebaseDb.db.ref('results').on('value', (snapshot) => {
      return resolve(snapshot.val());
    }, (errorObject) => {
      return reject(errorObject);
    });
  });
}

const summary = () => {
  console.log('summary');
  return [];
}

module.exports = {
  addResult,
  getResults,
  summary,
}