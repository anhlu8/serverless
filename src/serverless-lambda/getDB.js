const { jsonArrs } = require('../../src');

const arrayToObject = (arr, keyField) =>
    Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));

const getDB = async () => {
    let promise = await jsonArrs();

    let db = await arrayToObject(promise, "title")
    return db;
};

module.exports = getDB;
